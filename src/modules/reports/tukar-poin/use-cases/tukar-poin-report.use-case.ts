import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { ITukarPoinReportResponse } from "src/interface-adapter/interfaces/reports/tukar-poin/tukar-poin-report.response.interface";
import { PoinMemberCardRepositoryPort } from "src/modules/poin-member-card/database/poin-member-card.repository.port";
import { InjectPoinMemberCardRepository } from "src/modules/poin-member-card/database/poin-member-card.repository.provider";
import { TukarPoinReportRequestDTO } from "../controller/dtos/tukar-poin-report.request.dto";
import { TukarPoinReportResponseDTO } from "../controller/dtos/tukar-poin-report.response.dto";

@Injectable()
export class TukarPoinReport
  extends BaseUseCase
  implements IUseCase<TukarPoinReportRequestDTO, TukarPoinReportResponseDTO[]>
{
  constructor(
    @InjectPoinMemberCardRepository
    private readonly poinMemberCardRepository: PoinMemberCardRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: TukarPoinReportRequestDTO,
  ): Promise<TukarPoinReportResponseDTO[]> {
    try {
      const results = await this.poinMemberCardRepository.reportTukarPoin(
        request,
      );

      return results.map(
        (report: ITukarPoinReportResponse) =>
          new TukarPoinReportResponseDTO(report),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
