import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { StockHadiahCardRepositoryPort } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.port";
import { InjectStockHadiahCardRepository } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.provider";
import {
  AdjustStockHadiahRequestDTO,
  DetailHadiahRequestDTO,
} from "../controller/dtos/adjust-stock-hadiah.request.dto";
import { DetailHadiahRequestDTO as DetailHadiahDTO } from "src/modules/tambah-hadiah/controller/dtos/add-stock-hadiah.request.dto";
import { AdjustHadiahRepositoryPort } from "../database/adjust-hadiah.repository.port";
import { InjectAdjustHadiahRepository } from "../database/adjust-hadiah.repository.provider";
import { AdjustHadiahEntity } from "../domain/adjust-hadiah.entity";
import { CreateStockHadiahCard } from "src/modules/stock-hadiah-card/use-cases/create-stock-hadiah-card.use-case";
import { InjectHadiahRepository } from "src/modules/hadiah/database/hadiah.repository.provider";
import { HadiahRepositoryPort } from "src/modules/hadiah/database/hadiah.repository.port";

@Injectable()
export class AdjustStockHadiah
  extends BaseUseCase
  implements IUseCase<AdjustStockHadiahRequestDTO, MessageResponseDTO>
{
  constructor(
    @InjectAdjustHadiahRepository
    private readonly adjustHadiahRepository: AdjustHadiahRepositoryPort,
    @InjectStockHadiahCardRepository
    private readonly stockHadiahCardRepository: StockHadiahCardRepositoryPort,
    @InjectHadiahRepository
    private readonly hadiahRepository: HadiahRepositoryPort,
    private readonly createStockHadiahCard: CreateStockHadiahCard,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute(
    request?: AdjustStockHadiahRequestDTO,
  ): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      await session.withTransaction(async () => {
        const date = new Date();

        const noAdjustHadiah = await this.utils.generator.generateNoTransaksi(
          TipeTransaksi.AdjustStockHadiah,
          this.utils.date.formatDate(date, "YYMMDD"),
        );

        const adjustHadiahEntity = AdjustHadiahEntity.create({
          no_adjust_hadiah: noAdjustHadiah,
          tanggal: this.utils.date.localDateString(date),
          created_by: this?.user?.user_id,
          detail_hadiah: request.detail_hadiah,
          is_online: false,
        });

        await this.adjustHadiahRepository.save(adjustHadiahEntity, session);

        const detailHadiah: DetailHadiahDTO[] = await this._groupDetailHadiah(
          request.detail_hadiah,
        );

        await this.createStockHadiahCard.injectDecodedToken(this?.user).execute(
          {
            no_transaksi: noAdjustHadiah,
            tanggal: this.utils.date.localDateString(date),
            kategori: TipeTransaksi.AdjustStockHadiah,
            detail_hadiah: detailHadiah,
          },
          session,
        );
      });

      return new MessageResponseDTO("Success adjust stocks!");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }

  private async _groupDetailHadiah(
    detail_hadiah: DetailHadiahRequestDTO[],
  ): Promise<DetailHadiahDTO[]> {
    const result: DetailHadiahDTO[] = [];
    for (const hadiah of detail_hadiah) {
      const isAvailable = await this.hadiahRepository.findOne({
        status_active: true,
        kode_hadiah: hadiah.kode_hadiah,
      });

      if (!isAvailable) {
        throw new BadRequestException(
          `Data Hadiah ${hadiah.kode_hadiah} tidak dapat ditemukan!`,
        );
      }

      const latesStock = await this.stockHadiahCardRepository.findOneLatest({
        kode_hadiah: hadiah.kode_hadiah,
      });

      const awalStock = latesStock?.stock_akhir ?? 0;

      if (awalStock > hadiah.stock_akhir) {
        result.push({
          kode_hadiah: hadiah.kode_hadiah,
          stock_keluar: Math.abs(awalStock - hadiah.stock_akhir),
          stock_masuk: 0,
        });
      } else {
        result.push({
          kode_hadiah: hadiah.kode_hadiah,
          stock_keluar: 0,
          stock_masuk: awalStock - hadiah.stock_akhir,
        });
      }
    }

    return result;
  }
}
