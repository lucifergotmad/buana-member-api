import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { StockHadiahCardMongoEntity } from "./model/stock-hadiah-card.mongo-entity";
import { StockHadiahCardEntity } from "../domain/stock-hadiah-card.entity";
import { StockHadiahCardRepositoryPort } from "./stock-hadiah-card.repository.port";
import { StockHadiahCardMongoMapper } from "./model/stock-hadiah-card.mongo-mapper";
import { StockHadiahCardIgnore } from "src/core/constants/encryption/encryption-ignore";
import { IStockHadiahResponse } from "src/interface-adapter/interfaces/reports/hadiah/stock-hadiah-report.response.interface";
import { IHistoryStockHadiahResponse } from "src/interface-adapter/interfaces/reports/hadiah/history-stock-hadiah.response.interface";
import { HistoryStockHadiahRequestDTO } from "src/modules/reports/hadiah/controller/dtos/history-stock-hadiah.request.dto";
import { AdjustHadiahReportRequestDTO } from "src/modules/reports/adjust-hadiah/controller/dtos/adjust-hadiah-report.request.dto";
import { IAdjustHadiahReportResponse } from "src/interface-adapter/interfaces/reports/adjust-hadiah/adjust-hadiah-report.response.interface";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";

@Injectable()
export class StockHadiahCardRepository
  extends BaseRepository<StockHadiahCardMongoEntity, StockHadiahCardEntity>
  implements StockHadiahCardRepositoryPort
{
  constructor(
    @InjectModel(StockHadiahCardMongoEntity.name)
    private StockHadiahCardModel: Model<StockHadiahCardMongoEntity>,
  ) {
    super(
      StockHadiahCardModel,
      new StockHadiahCardMongoMapper(
        StockHadiahCardEntity,
        StockHadiahCardMongoEntity,
      ),
      StockHadiahCardIgnore,
    );
  }

  async reportHistoryStockHadiah({
    start_date,
    end_date,
    kode_hadiah,
  }: HistoryStockHadiahRequestDTO): Promise<IHistoryStockHadiahResponse[]> {
    const result = await this.StockHadiahCardModel.aggregate([
      {
        $match: {
          tanggal: {
            $gte: start_date,
            $lte: end_date,
          },
          ...this._generateOption(kode_hadiah),
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
          localField: "kode_hadiah",
          foreignField: "kode_hadiah",
          as: "hadiah",
        },
      },
      {
        $unwind: "$hadiah",
      },
      {
        $project: {
          _id: 0,
          tanggal: "$tanggal",
          no_transaksi: "$no_referensi",
          jenis_transaksi: "$kategori",
          kode_hadiah: "$kode_hadiah",
          nama_hadiah: "$hadiah.nama_hadiah",
          kode_member: "$tukar_poin.kode_member",
          qty: {
            $cond: {
              if: {
                $gt: ["$stock_keluar", 0],
              },
              then: {
                $multiply: ["$stock_keluar", -1],
              },
              else: "$stock_masuk",
            },
          },
        },
      },
    ]);

    return this.encryptor.doDecrypt(result, [
      ...this.ignore,
      "no_transaksi",
      "jenis_transaksi",
      "kode_member",
    ]);
  }

  private _generateOption(kode_hadiah?: string) {
    return kode_hadiah ? { kode_hadiah } : {};
  }

  async reportStockHadiah(tanggal: string): Promise<IStockHadiahResponse[]> {
    const result = await this.StockHadiahCardModel.aggregate([
      {
        $match: {
          tanggal: {
            $lte: tanggal,
          },
        },
      },
      {
        $sort: { tanggal: -1, _id: -1 },
      },
      {
        $group: {
          _id: "$kode_hadiah",
          qty: {
            $first: "$stock_akhir",
          },
        },
      },
      {
        $lookup: {
          from: "tm_hadiahs",
          localField: "_id",
          foreignField: "kode_hadiah",
          as: "hadiah",
        },
      },
      {
        $unwind: "$hadiah",
      },
      {
        $project: {
          _id: 0,
          kode_hadiah: "$_id",
          nama_hadiah: "$hadiah.nama_hadiah",
          poin: "$hadiah.poin_hadiah",
          qty: "$qty",
        },
      },
    ]);

    return this.encryptor.doDecrypt(result, this.ignore);
  }

  async reportAdjustHadiah({
    start_date,
    end_date,
  }: AdjustHadiahReportRequestDTO): Promise<IAdjustHadiahReportResponse[]> {
    const result = await this.StockHadiahCardModel.aggregate([
      {
        $match: {
          tanggal: {
            $gte: start_date,
            $lte: end_date,
          },
          kategori: TipeTransaksi.AdjustStockHadiah,
        },
      },
      {
        $lookup: {
          from: "tm_hadiahs",
          localField: "kode_hadiah",
          foreignField: "kode_hadiah",
          as: "hadiah",
        },
      },
      {
        $unwind: "$hadiah",
      },
      {
        $project: {
          _id: 0,
          tanggal: "$tanggal",
          kode_hadiah: "$kode_hadiah",
          nama_hadiah: "$hadiah.nama_hadiah",
          stock_awal: "$stock_awal",
          stock_akhir: "$stock_akhir",
          created_by: "$created_by",
        },
      },
    ]);

    return this.encryptor.doDecrypt(result, this.ignore);
  }
}
