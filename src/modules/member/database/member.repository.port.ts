import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { MemberMongoEntity } from "./model/member.mongo-entity";
import { MemberEntity } from "../domain/member.entity";
import { ClientSession, FilterQuery } from "mongoose";

export interface MemberRepositoryPort
  extends BaseRepositoryPort<MemberMongoEntity, MemberEntity> {
  findBySorted(
    identifier: FilterQuery<MemberMongoEntity>,
    session?: ClientSession,
  ): Promise<Array<MemberMongoEntity>>;
}
