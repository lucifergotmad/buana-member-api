import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientSession } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { HadiahRepositoryPort } from "src/modules/hadiah/database/hadiah.repository.port";
import { InjectHadiahRepository } from "src/modules/hadiah/database/hadiah.repository.provider";
import { CreateStockHadiahCardRequestDTO } from "../controller/dtos/create-stock-hadiah-card.request.dto";
import { StockHadiahCardRepositoryPort } from "../database/stock-hadiah-card.repository.port";
import { InjectStockHadiahCardRepository } from "../database/stock-hadiah-card.repository.provider";
import { StockHadiahCardEntity } from "../domain/stock-hadiah-card.entity";

@Injectable()
export class CreateStockHadiahCard
  extends BaseUseCase
  implements IUseCase<CreateStockHadiahCardRequestDTO, MessageResponseDTO>
{
  constructor(
    @InjectStockHadiahCardRepository
    private readonly stockHadiahCardRepository: StockHadiahCardRepositoryPort,
    @InjectHadiahRepository
    private readonly hadiahRepository: HadiahRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: CreateStockHadiahCardRequestDTO,
    session?: ClientSession,
  ): Promise<MessageResponseDTO> {
    try {
      for (const hadiah of request.detail_hadiah) {
        const latesStock = await this.stockHadiahCardRepository.findOneLatest({
          kode_hadiah: hadiah.kode_hadiah,
        });

        const awalStock = latesStock ? latesStock.stock_akhir : 0;
        const akhirStock = !hadiah.stock_keluar
          ? awalStock + hadiah.stock_masuk
          : awalStock - hadiah.stock_keluar;

        if (akhirStock < 0) {
          throw new BadRequestException(
            "Tidak bisa mengurangi stock lebih dari semestinya! ",
          );
        }

        if (latesStock) {
          await this.stockHadiahCardRepository.updateWithoutThrow(
            {
              kode_hadiah: hadiah.kode_hadiah,
              tanggal: { $gt: request.tanggal },
            },
            {
              $inc: {
                stock_awal:
                  !hadiah.stock_keluar || hadiah.stock_masuk
                    ? hadiah.stock_masuk
                    : hadiah.stock_keluar * -1,
                stock_akhir:
                  !hadiah.stock_keluar || hadiah.stock_masuk
                    ? hadiah.stock_masuk
                    : hadiah.stock_keluar * -1,
              },
            },
            session,
          );
        }

        const stockHadiahCardEntity = StockHadiahCardEntity.create({
          kode_hadiah: hadiah.kode_hadiah,
          tanggal: request.tanggal,
          created_by: this?.user?.user_id,
          kategori: request.kategori,
          no_referensi: request.no_transaksi,
          stock_akhir: akhirStock,
          stock_awal: awalStock,
          stock_keluar: hadiah.stock_keluar,
          stock_masuk: hadiah.stock_masuk,
          is_online: false,
        });

        await this.stockHadiahCardRepository.save(
          stockHadiahCardEntity,
          session,
        );

        await this.hadiahRepository.update(
          { kode_hadiah: hadiah.kode_hadiah },
          { stock_hadiah: akhirStock },
          session,
        );
      }

      return new MessageResponseDTO("Success add to Stock Hadiah Card");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
