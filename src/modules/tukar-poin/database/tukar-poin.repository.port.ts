import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { TukarPoinMongoEntity } from "./model/tukar-poin.mongo-entity";
import { TukarPoinEntity } from "../domain/tukar-poin.entity";
import { ClientSession, FilterQuery } from "mongoose";

export interface TukarPoinRepositoryPort
  extends BaseRepositoryPort<TukarPoinMongoEntity, TukarPoinEntity> {
  findByWithNama(
    identifier: FilterQuery<TukarPoinMongoEntity>,
    session?: ClientSession,
  ): Promise<Array<TukarPoinMongoEntity>>;
}
