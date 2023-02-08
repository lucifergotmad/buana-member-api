import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { FilterQuery, Model } from "mongoose";
import { PoinMemberCardMongoEntity } from "./model/poin-member-card.mongo-entity";
import { PoinMemberCardEntity } from "../domain/poin-member-card.entity";
import { PoinMemberCardRepositoryPort } from "./poin-member-card.repository.port";
import { PoinMemberCardMongoMapper } from "./model/poin-member-card.mongo-mapper";
import { PoinMemberCardIgnore } from "src/core/constants/encryption/encryption-ignore";
import { ITukarPoinReportResponse } from "src/interface-adapter/interfaces/reports/tukar-poin/tukar-poin-report.response.interface";
import { TukarPoinReportRequestDTO } from "src/modules/reports/tukar-poin/controller/dtos/tukar-poin-report.request.dto";
import { ITransaksiMemberReportResponse } from "src/interface-adapter/interfaces/reports/transaksi-member/transaksi-member-report.response.interface";

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

  async reportTukarPoin({
    start_date,
    end_date,
  }: TukarPoinReportRequestDTO): Promise<ITukarPoinReportResponse[]> {
    const result = await this.PoinMemberCardModel.aggregate([
      {
        $match: {
          tanggal: {
            $gte: start_date,
            $lte: end_date,
          },
        },
      },
      {
        $lookup: {
          from: "tt_tukar_poins",
          localField: "no_referensi",
          foreignField: "no_tukar_poin",
          as: "tukar_poin",
        },
      },
      {
        $unwind: {
          path: "$tukar_poin",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "tm_hadiahs",
          localField: "tukar_poin.kode_hadiah",
          foreignField: "kode_hadiah",
          as: "hadiah",
        },
      },
      {
        $unwind: "$hadiah",
      },
      {
        $lookup: {
          from: "tm_members",
          localField: "kode_member",
          foreignField: "kode_member",
          as: "member",
        },
      },
      {
        $unwind: "$member",
      },
      {
        $project: {
          _id: 0,
          tanggal: "$tanggal",
          kode_member: "$kode_member",
          nama_member: "$member.nama_lengkap",
          nama_hadiah: "$hadiah.nama_hadiah",
          poin_awal: "$poin_awal",
          poin_tukar: "$poin_keluar",
          poin_akhir: "$poin_akhir",
        },
      },
    ]);

    return this.encryptor.doDecrypt(result, this.ignore);
  }

  async reportTransaksiMember(
    identifier: FilterQuery<PoinMemberCardMongoEntity>,
  ): Promise<ITransaksiMemberReportResponse[]> {
    const result = await this.PoinMemberCardModel.aggregate([
      { $match: this.encryptor.doEncrypt(identifier, this.ignore) },
      {
        $lookup: {
          from: "tt_sales",
          localField: "no_referensi",
          foreignField: "no_transaksi",
          as: "sales",
        },
      },
      {
        $unwind: {
          path: "$sales",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "tm_members",
          localField: "kode_member",
          foreignField: "kode_member",
          as: "member",
        },
      },
      {
        $unwind: "$member",
      },
      {
        $project: {
          _id: 0,
          tanggal: "$tanggal",
          created_by: "$created_by",
          kode_member: "$kode_member",
          nama_lengkap: "$member.nama_lengkap",
          kategori: "$kategori",
          deskripsi: "$no_referensi",
          jual_rp: "$sales.sub_total",
          disc_rp: "$sales.potongan",
          total_jual_rp: "$sales.total_transaksi",
          poin: {
            $cond: {
              if: {
                $gt: ["$poin_keluar", 0],
              },
              then: {
                $multiply: ["$poin_keluar", -1],
              },
              else: "$poin_masuk",
            },
          },
        },
      },
    ]);

    return this.encryptor.doDecrypt(result, [...this.ignore, "deskripsi"]);
  }
}
