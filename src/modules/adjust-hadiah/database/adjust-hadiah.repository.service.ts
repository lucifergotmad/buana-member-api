import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { AdjustHadiahMongoEntity } from "./model/adjust-hadiah.mongo-entity";
import { AdjustHadiahEntity } from "../domain/adjust-hadiah.entity";
import { AdjustHadiahRepositoryPort } from "./adjust-hadiah.repository.port";
import { AdjustHadiahMongoMapper } from "./model/adjust-hadiah.mongo-mapper";

@Injectable()
export class AdjustHadiahRepository
  extends BaseRepository<AdjustHadiahMongoEntity, AdjustHadiahEntity>
  implements AdjustHadiahRepositoryPort
{
  constructor(
    @InjectModel(AdjustHadiahMongoEntity.name)
    private AdjustHadiahModel: Model<AdjustHadiahMongoEntity>,
  ) {
    super(
      AdjustHadiahModel,
      new AdjustHadiahMongoMapper(AdjustHadiahEntity, AdjustHadiahMongoEntity),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
