import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { TambahHadiahMongoEntity } from "./model/tambah-hadiah.mongo-entity";
import { TambahHadiahEntity } from "../domain/tambah-hadiah.entity";

export interface TambahHadiahRepositoryPort
  extends BaseRepositoryPort<TambahHadiahMongoEntity, TambahHadiahEntity> {
  __init__(): void;
}
