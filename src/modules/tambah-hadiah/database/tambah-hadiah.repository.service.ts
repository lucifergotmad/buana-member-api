import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { TambahHadiahMongoEntity } from "./model/tambah-hadiah.mongo-entity";
import { TambahHadiahEntity } from "../domain/tambah-hadiah.entity";
import { TambahHadiahRepositoryPort } from "./tambah-hadiah.repository.port";
import { TambahHadiahMongoMapper } from "./model/tambah-hadiah.mongo-mapper";

@Injectable()
export class TambahHadiahRepository
  extends BaseRepository<TambahHadiahMongoEntity, TambahHadiahEntity>
  implements TambahHadiahRepositoryPort
{
  constructor(
    @InjectModel(TambahHadiahMongoEntity.name)
    private TambahHadiahModel: Model<TambahHadiahMongoEntity>,
  ) {
    super(
      TambahHadiahModel,
      new TambahHadiahMongoMapper(TambahHadiahEntity, TambahHadiahMongoEntity),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
