import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { TukarPoinMongoEntity } from "./model/tukar-poin.mongo-entity";
import { TukarPoinEntity } from "../domain/tukar-poin.entity";

export interface TukarPoinRepositoryPort
  extends BaseRepositoryPort<TukarPoinMongoEntity, TukarPoinEntity> {
  __init__(): void;
}
