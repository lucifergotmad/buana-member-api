import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { MemberMongoEntity } from "./model/member.mongo-entity";
import { MemberEntity } from "../domain/member.entity";
import { ClientSession, FilterQuery } from "mongoose";
import { ISortBy } from "../domain/types/sort-by.interface";

export interface MemberRepositoryPort
  extends BaseRepositoryPort<MemberMongoEntity, MemberEntity> {
  findBySorted(
    identifier: FilterQuery<MemberMongoEntity>,
    session?: ClientSession,
  ): Promise<Array<MemberMongoEntity>>;
  reportDataMember(
    identifier: FilterQuery<MemberMongoEntity>,
    sort_by: ISortBy,
    session?: ClientSession,
  ): Promise<Array<MemberMongoEntity>>;
}
