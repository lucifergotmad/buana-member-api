import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { ClientSession, FilterQuery, Model } from "mongoose";
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

  async findByWithNama(
    identifier: FilterQuery<AdjustHadiahMongoEntity>,
    session?: ClientSession,
  ): Promise<Array<AdjustHadiahMongoEntity>> {
    const result = await this.AdjustHadiahModel.aggregate([
      { $match: this.encryptor.doEncrypt(identifier, this.ignore) },
      { $unwind: "$detail_hadiah" },
      {
        $lookup: {
          from: "tm_hadiahs",
          localField: "detail_hadiah.kode_hadiah",
          foreignField: "kode_hadiah",
          as: "hadiah",
        },
      },
      { $unwind: "$hadiah" },
      {
        $group: {
          _id: "$no_adjust_hadiah",
          tanggal: {
            $first: "$tanggal",
          },
          detail_hadiah: {
            $push: {
              kode_hadiah: "$detail_hadiah.kode_hadiah",
              nama_hadiah: "$hadiah.nama_hadiah",
              stock_keluar: "$detail_hadiah.stock_keluar",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          no_adjust_hadiah: "$_id",
          tanggal: "$tanggal",
          detail_hadiah: "$detail_hadiah",
        },
      },
    ]).session(session);

    return this.encryptor.doDecrypt(result, this.ignore);
  }
}
