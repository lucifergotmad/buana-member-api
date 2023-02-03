import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { PoinMemberCardMongoEntity } from "./model/poin-member-card.mongo-entity";
import { PoinMemberCardEntity } from "../domain/poin-member-card.entity";
import { PoinMemberCardRepositoryPort } from "./poin-member-card.repository.port";
import { PoinMemberCardMongoMapper } from "./model/poin-member-card.mongo-mapper";
import { PoinMemberCardIgnore } from "src/core/constants/encryption/encryption-ignore";

@Injectable()
export class PoinMemberCardRepository
  extends BaseRepository<PoinMemberCardMongoEntity, PoinMemberCardEntity>
  implements PoinMemberCardRepositoryPort
{
  constructor(
    @InjectModel(PoinMemberCardMongoEntity.name)
    private PoinMemberCardModel: Model<PoinMemberCardMongoEntity>,
  ) {
    super(
      PoinMemberCardModel,
      new PoinMemberCardMongoMapper(
        PoinMemberCardEntity,
        PoinMemberCardMongoEntity,
      ),
      PoinMemberCardIgnore,
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
