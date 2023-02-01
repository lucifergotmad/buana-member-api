import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { ClientSession, FilterQuery, Model } from "mongoose";
import { TambahHadiahMongoEntity } from "./model/tambah-hadiah.mongo-entity";
import { TambahHadiahEntity } from "../domain/tambah-hadiah.entity";
import { TambahHadiahRepositoryPort } from "./tambah-hadiah.repository.port";
import { TambahHadiahMongoMapper } from "./model/tambah-hadiah.mongo-mapper";
import { TambahHadiahIgnore } from "src/core/constants/encryption/encryption-ignore";

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
      TambahHadiahIgnore,
    );
  }

  async findByWithNama(
    identifier: FilterQuery<TambahHadiahMongoEntity>,
    session?: ClientSession,
  ): Promise<Array<TambahHadiahMongoEntity>> {
    const result = await this.TambahHadiahModel.aggregate([
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
          _id: "$no_tambah_hadiah",
          tanggal: {
            $first: "$tanggal",
          },
          detail_hadiah: {
            $push: {
              kode_hadiah: "$detail_hadiah.kode_hadiah",
              nama_hadiah: "$hadiah.nama_hadiah",
              stock_masuk: "$detail_hadiah.stock_masuk",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          no_tambah_hadiah: "$_id",
          tanggal: "$tanggal",
          detail_hadiah: "$detail_hadiah",
        },
      },
    ]).session(session);

    return this.encryptor.doDecrypt(result, this.ignore);
  }
}
