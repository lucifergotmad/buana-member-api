import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { StockHadiahCardMongoEntity } from "./model/stock-hadiah-card.mongo-entity";
import { StockHadiahCardEntity } from "../domain/stock-hadiah-card.entity";
import { StockHadiahCardRepositoryPort } from "./stock-hadiah-card.repository.port";
import { StockHadiahCardMongoMapper } from "./model/stock-hadiah-card.mongo-mapper";

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
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
