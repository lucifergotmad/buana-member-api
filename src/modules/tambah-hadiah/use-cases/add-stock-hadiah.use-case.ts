import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { CreateStockHadiahCard } from "src/modules/stock-hadiah-card/use-cases/create-stock-hadiah-card.use-case";
import {
  AddStockHadiahRequestDTO,
  DetailHadiahRequestDTO,
} from "../controller/dtos/add-stock-hadiah.request.dto";
import { TambahHadiahRepositoryPort } from "../database/tambah-hadiah.repository.port";
import { InjectTambahHadiahRepository } from "../database/tambah-hadiah.repository.provider";
import { TambahHadiahEntity } from "../domain/tambah-hadiah.entity";

@Injectable()
export class AddStockHadiah
  extends BaseUseCase
  implements IUseCase<AddStockHadiahRequestDTO, MessageResponseDTO>
{
  constructor(
    @InjectTambahHadiahRepository
    private readonly tambahHadiahRepository: TambahHadiahRepositoryPort,
    private readonly createStockHadiahCard: CreateStockHadiahCard,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute(
    request?: AddStockHadiahRequestDTO,
  ): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      await session.withTransaction(async () => {
        const date = new Date();
        const noTambahHadiah = await this.utils.generator.generateNoTransaksi(
          TipeTransaksi.TambahStockHadiah,
          this.utils.date.formatDate(date, "YYMMDD"),
        );

        const tambahHadiahEntity = TambahHadiahEntity.create({
          no_tambah_hadiah: noTambahHadiah,
          tanggal: this.utils.date.localDateString(date),
          detail_hadiah: request.detail_hadiah,
          created_by: this?.user?.user_id,
          is_online: false,
        });

        await this.tambahHadiahRepository.save(tambahHadiahEntity, session);

        const groupedHadiah = this._groupDetailHadiah(request.detail_hadiah);

        await this.createStockHadiahCard.injectDecodedToken(this?.user).execute(
          {
            no_transaksi: noTambahHadiah,
            tanggal: this.utils.date.localDateString(date),
            kategori: TipeTransaksi.TambahStockHadiah,
            detail_hadiah: groupedHadiah,
          },
          session,
        );
      });

      return new MessageResponseDTO("Success adding stock hadiah!");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }

  private _groupDetailHadiah(detail_hadiah: DetailHadiahRequestDTO[]) {
    const groupedHadiah: DetailHadiahRequestDTO[] = [];

    detail_hadiah.reduce((acc: any, value: DetailHadiahRequestDTO) => {
      if (!acc[value.kode_hadiah]) {
        acc[value.kode_hadiah] = {
          kode_hadiah: value.kode_hadiah,
          stock_masuk: 0,
          stock_keluar: 0,
        };
        groupedHadiah.push(acc[value.kode_hadiah]);
      }

      acc[value.kode_hadiah].stock_masuk += value.stock_masuk;
      acc[value.kode_hadiah].stock_keluar += value?.stock_keluar ?? 0;

      return acc;
    }, {});

    return groupedHadiah;
  }
}
