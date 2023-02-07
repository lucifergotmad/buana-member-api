import { Injectable } from "@nestjs/common";
import { FilterQuery } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { ITransaksiMemberReportResponse } from "src/interface-adapter/interfaces/reports/transaksi-member/transaksi-member-report.response.interface";
import { PoinMemberCardMongoEntity } from "src/modules/poin-member-card/database/model/poin-member-card.mongo-entity";
import { PoinMemberCardRepositoryPort } from "src/modules/poin-member-card/database/poin-member-card.repository.port";
import { InjectPoinMemberCardRepository } from "src/modules/poin-member-card/database/poin-member-card.repository.provider";
import { TransaksiMemberReportRequestDTO } from "../controller/dtos/transaksi-member-report.request.dto";
import { TransaksiMemberReportResponseDTO } from "../controller/dtos/transaksi-member-report.response.dto";

@Injectable()
export class TransaksiMemberReport
  extends BaseUseCase
  implements
    IUseCase<
      TransaksiMemberReportRequestDTO,
      TransaksiMemberReportResponseDTO[]
    >
{
  constructor(
    @InjectPoinMemberCardRepository
    private readonly poinMemberCardRepository: PoinMemberCardRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: TransaksiMemberReportRequestDTO,
  ): Promise<TransaksiMemberReportResponseDTO[]> {
    try {
      const results = await this.poinMemberCardRepository.reportTransaksiMember(
        {
          $and: [
            this._generateDateOpt(request.start_date, request.end_date),
            this._generateKategoriOpt(request?.kategori),
            this._generateKodeMemberOpt(request?.kode_member),
          ],
        },
      );

      return results.map(
        (report: ITransaksiMemberReportResponse) =>
          new TransaksiMemberReportResponseDTO(report),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }

  private _generateDateOpt(
    start_date: string,
    end_date: string,
  ): FilterQuery<PoinMemberCardMongoEntity> {
    return start_date && end_date
      ? { tanggal: { $gte: start_date, $lte: end_date } }
      : {};
  }

  private _generateKategoriOpt(kategori?: string) {
    return kategori ? { kategori } : {};
  }

  private _generateKodeMemberOpt(kode_member?: string) {
    return kode_member ? { kode_member } : {};
  }
}
