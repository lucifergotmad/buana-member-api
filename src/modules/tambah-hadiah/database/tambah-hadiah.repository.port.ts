import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { TambahHadiahMongoEntity } from "./model/tambah-hadiah.mongo-entity";
import { TambahHadiahEntity } from "../domain/tambah-hadiah.entity";
import { ClientSession, FilterQuery } from "mongoose";

export interface TambahHadiahRepositoryPort
  extends BaseRepositoryPort<TambahHadiahMongoEntity, TambahHadiahEntity> {
  findByWithNama(
    identifier: FilterQuery<TambahHadiahMongoEntity>,
    session?: ClientSession,
  ): Promise<Array<TambahHadiahMongoEntity>>;
}
