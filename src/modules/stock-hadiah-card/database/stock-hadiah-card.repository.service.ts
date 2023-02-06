import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { StockHadiahCardMongoEntity } from "./model/stock-hadiah-card.mongo-entity";
import { StockHadiahCardEntity } from "../domain/stock-hadiah-card.entity";
import { StockHadiahCardRepositoryPort } from "./stock-hadiah-card.repository.port";
import { StockHadiahCardMongoMapper } from "./model/stock-hadiah-card.mongo-mapper";
import { StockHadiahCardIgnore } from "src/core/constants/encryption/encryption-ignore";
import { IStockHadiahResponse } from "src/interface-adapter/interfaces/reports/hadiah/stock-hadiah-report.response.interface";

@Injectable()
export class StockHadiahCardRepository
  extends BaseRepository<StockHadiahCardMongoEntity, StockHadiahCardEntity>
  implements StockHadiahCardRepositoryPort
{
  constructor(
    @InjectModel(StockHadiahCardMongoEntity.name)
    private StockHadiahCardModel: Model<StockHadiahCardMongoEntity>,
  ) {
    super(
      StockHadiahCardModel,
      new StockHadiahCardMongoMapper(
        StockHadiahCardEntity,
        StockHadiahCardMongoEntity,
      ),
      StockHadiahCardIgnore,
    );
  }

  async reportStockHadiah(tanggal: string): Promise<IStockHadiahResponse[]> {
    const result = await this.StockHadiahCardModel.aggregate([
      {
        $match: {
          tanggal: {
            $lte: tanggal,
          },
        },
      },
      {
        $sort: { tanggal: -1, _id: -1 },
      },
      {
        $group: {
          _id: "$kode_hadiah",
          qty: {
            $first: "$stock_akhir",
          },
        },
      },
      {
        $lookup: {
          from: "tm_hadiah",
          localField: "_id",
          foreignField: "kode_hadiah",
          as: "hadiah",
        },
      },
      {
        $unwind: "$hadiah",
      },
      {
        $project: {
          _id: 0,
          kode_hadiah: "$_id",
          nama_hadiah: "$hadiah.nama_hadiah",
          poin: "$hadiah.poin_hadiah",
          qty: "$qty",
        },
      },
    ]);

    return this.encryptor.doDecrypt(result, this.ignore);
  }
}
