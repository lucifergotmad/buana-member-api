import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { PoinMemberCardMongoEntity } from "./model/poin-member-card.mongo-entity";
import { PoinMemberCardEntity } from "../domain/poin-member-card.entity";

export interface PoinMemberCardRepositoryPort
  extends BaseRepositoryPort<PoinMemberCardMongoEntity, PoinMemberCardEntity> {
  __init__(): void;
}
