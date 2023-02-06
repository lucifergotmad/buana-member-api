import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { ClientSession, FilterQuery, Model } from "mongoose";
import { MemberMongoEntity } from "./model/member.mongo-entity";
import { MemberEntity } from "../domain/member.entity";
import { MemberRepositoryPort } from "./member.repository.port";
import { MemberMongoMapper } from "./model/member.mongo-mapper";
import { MemberIgnore } from "src/core/constants/encryption/encryption-ignore";
import { ISortBy } from "../types/sort-by.interface";

@Injectable()
export class MemberRepository
  extends BaseRepository<MemberMongoEntity, MemberEntity>
  implements MemberRepositoryPort
{
  constructor(
    @InjectModel(MemberMongoEntity.name)
    private MemberModel: Model<MemberMongoEntity>,
  ) {
    super(
      MemberModel,
      new MemberMongoMapper(MemberEntity, MemberMongoEntity),
      MemberIgnore,
    );
  }

  async findBySorted(
    identifier: FilterQuery<MemberMongoEntity>,
    session?: ClientSession,
  ): Promise<MemberMongoEntity[]> {
    const result = await this.MemberModel.aggregate([
      { $match: this.encryptor.doEncrypt(identifier, this.ignore) },
      {
        $sort: {
          kode_member: 1,
        },
      },
    ]).session(session);

    return this.encryptor.doDecrypt(result, this.ignore);
  }

  async reportDataMember(
    identifier: FilterQuery<MemberMongoEntity>,
    sort_by: ISortBy,
    session?: ClientSession,
  ) {
    const result = await this.MemberModel.aggregate([
      { $match: this.encryptor.doEncrypt(identifier, this.ignore) },
      {
        $addFields: {
          index_pengeluaran: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$pengeluaran", "< 1000000"] },
                  then: 1,
                },
                {
                  case: { $eq: ["$pengeluaran", "1000000 - 2000000"] },
                  then: 2,
                },
                {
                  case: { $eq: ["$pengeluaran", "> 2000000"] },
                  then: 3,
                },
              ],
              default: 0,
            },
          },
          index_penghasilan: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$penghasilan", "< 1000000"] },
                  then: 1,
                },
                {
                  case: { $eq: ["$penghasilan", "1000000 - 2000000"] },
                  then: 2,
                },
                {
                  case: { $eq: ["$penghasilan", "> 2000000"] },
                  then: 3,
                },
              ],
              default: 0,
            },
          },
        },
      },
      {
        $sort: { ...sort_by },
      },
    ]).session(session);

    return this.encryptor.doDecrypt(result, this.ignore);
  }
}
