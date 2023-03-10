import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { HadiahMongoEntity } from "./model/hadiah.mongo-entity";
import { HadiahEntity } from "../domain/hadiah.entity";
import { HadiahRepositoryPort } from "./hadiah.repository.port";
import { HadiahMongoMapper } from "./model/hadiah.mongo-mapper";
import { HadiahIgnore } from "src/core/constants/encryption/encryption-ignore";

@Injectable()
export class HadiahRepository
  extends BaseRepository<HadiahMongoEntity, HadiahEntity>
  implements HadiahRepositoryPort
{
  constructor(
    @InjectModel(HadiahMongoEntity.name)
    private HadiahModel: Model<HadiahMongoEntity>,
  ) {
    super(
      HadiahModel,
      new HadiahMongoMapper(HadiahEntity, HadiahMongoEntity),
      HadiahIgnore,
    );
  }
}
