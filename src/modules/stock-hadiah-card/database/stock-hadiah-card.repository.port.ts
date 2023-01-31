import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { StockHadiahCardMongoEntity } from "./model/stock-hadiah-card.mongo-entity";
import { StockHadiahCardEntity } from "../domain/stock-hadiah-card.entity";

export interface StockHadiahCardRepositoryPort
  extends BaseRepositoryPort<
    StockHadiahCardMongoEntity,
    StockHadiahCardEntity
  > {
  __init__(): void;
}
