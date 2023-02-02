import { Injectable } from "@nestjs/common";
import { ClientSession } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
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
        const akhirStock = awalStock + hadiah.stock_masuk;

        await this.stockHadiahCardRepository.update(
          { kode_hadiah: hadiah.kode_hadiah },
          {
            $inc: {
              stock_awal:
                !hadiah.stock_keluar || hadiah.stock_masuk
                  ? awalStock
                  : awalStock * -1,
              stock_akhir:
                !hadiah.stock_keluar || hadiah.stock_masuk
                  ? akhirStock
                  : akhirStock * -1,
            },
          },
          session,
        );

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
      }

      return new MessageResponseDTO("Success add to Stock Hadiah Card");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
