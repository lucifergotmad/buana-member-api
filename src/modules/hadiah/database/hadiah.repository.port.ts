import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { HadiahMongoEntity } from "./model/hadiah.mongo-entity";
import { HadiahEntity } from "../domain/hadiah.entity";

export interface HadiahRepositoryPort
  extends BaseRepositoryPort<HadiahMongoEntity, HadiahEntity> {
  __init__(): void;
}
