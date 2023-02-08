import { BadRequestException, Injectable } from "@nestjs/common";
import { Aggregate, FilterQuery } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { SortBy } from "src/core/constants/app/member-report/sort-by.const";
import { StatusMember } from "src/core/constants/app/member-report/status-member.const";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MemberRepositoryPort } from "src/modules/member/database/member.repository.port";
import { InjectMemberRepository } from "src/modules/member/database/member.repository.provider";
import { MemberMongoEntity } from "src/modules/member/database/model/member.mongo-entity";
import { ISortBy } from "src/modules/member/domain/types/sort-by.interface";
import { ReportDataMemberRequestDTO } from "../controller/dtos/report-data-member.request.dto";
import { ReportDataMemberResponseDTO } from "../controller/dtos/report-data-member.response.dto";

@Injectable()
export class ReportDataMember
  extends BaseUseCase
  implements
    IUseCase<ReportDataMemberRequestDTO, ReportDataMemberResponseDTO[]>
{
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute(
    request?: ReportDataMemberRequestDTO,
  ): Promise<ReportDataMemberResponseDTO[]> {
    try {
      this._validateQuery(request);

      const results = await this.memberRepository.reportDataMember(
        this._generateFilter(request.status_member),
        this._generateSort(request.sort_by),
      );

      return results.map(
        (dataMember: MemberMongoEntity) =>
          new ReportDataMemberResponseDTO(dataMember),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }

  private _validateQuery({
    status_member,
    sort_by,
  }: ReportDataMemberRequestDTO) {
    if (!Object.values(StatusMember).includes(status_member as StatusMember)) {
      throw new BadRequestException("Query status member tidak valid!");
    }

    if (!Object.values(SortBy).includes(sort_by as SortBy)) {
      throw new BadRequestException("Query sort by tidak valid!");
    }
  }

  private _generateSort(sort_by: string): ISortBy {
    switch (sort_by) {
      case SortBy.Kode:
        return { kode_member: 1 };
      case SortBy.Nama:
        return { nama_member: 1 };
      case SortBy.KTP:
        return { no_identitas: 1 };
      case SortBy.Agama:
        return { agama: 1 };
      case SortBy.NoHP:
        return { no_hp: 1 };
      case SortBy.NoTelepon:
        return { telp_rumah: 1 };
      case SortBy.NoKantor:
        return { telp_kantor: 1 };
      case SortBy.JumlahAnakPria:
        return { jumlah_anak_pria: 1 };
      case SortBy.JumlahAnakWanita:
        return { jumlah_anak_wanita: 1 };
      case SortBy.Pengeluaran:
        return { index_pengeluaran: 1 };
      case SortBy.Penghasilan:
        return { index_penghasilan: 1 };
      default:
        throw new BadRequestException("Query sort by tidak valid!");
    }
  }

  private _generateFilter(
    status_member: string,
  ): FilterQuery<MemberMongoEntity> {
    const now = this.utils.date.getToday();
    return status_member !== StatusMember.NonAktif
      ? { tanggal_valid: { $gte: now } }
      : { tanggal_valid: { $lt: now } };
  }
}
