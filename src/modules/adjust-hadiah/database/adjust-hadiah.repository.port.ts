import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { AdjustHadiahMongoEntity } from "./model/adjust-hadiah.mongo-entity";
import { AdjustHadiahEntity } from "../domain/adjust-hadiah.entity";

export interface AdjustHadiahRepositoryPort
  extends BaseRepositoryPort<AdjustHadiahMongoEntity, AdjustHadiahEntity> {
  __init__(): void;
}
