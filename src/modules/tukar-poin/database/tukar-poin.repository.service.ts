import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { ClientSession, FilterQuery, Model } from "mongoose";
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

  async findByWithNama(
    identifier: FilterQuery<TukarPoinMongoEntity>,
    session?: ClientSession,
  ): Promise<Array<TukarPoinMongoEntity>> {
    const result = await this.TukarPoinModel.aggregate([
      { $match: this.encryptor.doEncrypt(identifier, this.ignore) },
      {
        $lookup: {
          from: "tm_hadiahs",
          localField: "kode_hadiah",
          foreignField: "kode_hadiah",
          as: "hadiah",
        },
      },
      { $unwind: "$hadiah" },
      {
        $lookup: {
          from: "tm_members",
          localField: "kode_member",
          foreignField: "kode_member",
          as: "member",
        },
      },
      { $unwind: "$member" },
      {
        $project: {
          _id: 0,
          no_tukar_poin: "$no_tukar_poin",
          tanggal: "$tanggal",
          kode_member: "$kode_member",
          nama_member: "$member.nama_member",
          kode_hadiah: "$kode_hadiah",
          nama_hadiah: "$hadiah.nama_hadiah",
          jumlah: "$jumlah",
        },
      },
    ]).session(session);

    return this.encryptor.doDecrypt(result, this.ignore);
  }
}
