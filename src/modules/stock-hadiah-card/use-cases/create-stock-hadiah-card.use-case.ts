import { Injectable } from "@nestjs/common";
import { ClientSession } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { CreateStockHadiahCardRequestDTO } from "src/modules/tambah-hadiah/controller/dtos/add-stock-hadiah.request.dto";
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
              stock_awal: awalStock,
              stock_akhir: akhirStock,
            },
          },
          session,
        );

        const stockHadiahCardEntity = StockHadiahCardEntity.create({
          kode_hadiah: hadiah.kode_hadiah,
          created_by: this.user?.username,
          kategori: request.kategori,
          no_referensi: request.no_tambah_hadiah,
          stock_akhir: akhirStock,
          stock_awal: awalStock,
          stock_keluar: 0,
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
