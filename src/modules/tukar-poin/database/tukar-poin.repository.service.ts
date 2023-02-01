import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { TukarPoinMongoEntity } from "./model/tukar-poin.mongo-entity";
import { TukarPoinEntity } from "../domain/tukar-poin.entity";
import { TukarPoinRepositoryPort } from "./tukar-poin.repository.port";
import { TukarPoinMongoMapper } from "./model/tukar-poin.mongo-mapper";
import { TukarPoinIgnore } from "src/core/constants/encryption/encryption-ignore";

@Injectable()
export class TukarPoinRepository
  extends BaseRepository<TukarPoinMongoEntity, TukarPoinEntity>
  implements TukarPoinRepositoryPort
{
  constructor(
    @InjectModel(TukarPoinMongoEntity.name)
    private TukarPoinModel: Model<TukarPoinMongoEntity>,
  ) {
    super(
      TukarPoinModel,
      new TukarPoinMongoMapper(TukarPoinEntity, TukarPoinMongoEntity),
      TukarPoinIgnore,
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
