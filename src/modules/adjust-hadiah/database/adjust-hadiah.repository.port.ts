import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { AdjustHadiahMongoEntity } from "./model/adjust-hadiah.mongo-entity";
import { AdjustHadiahEntity } from "../domain/adjust-hadiah.entity";
import { ClientSession, FilterQuery } from "mongoose";

export interface AdjustHadiahRepositoryPort
  extends BaseRepositoryPort<AdjustHadiahMongoEntity, AdjustHadiahEntity> {
  findByWithNama(
    identifier: FilterQuery<AdjustHadiahMongoEntity>,
    session?: ClientSession,
  ): Promise<Array<AdjustHadiahMongoEntity>>;
}
