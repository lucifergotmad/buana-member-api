import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IAdjustHadiahReportResponse } from "src/interface-adapter/interfaces/reports/adjust-hadiah/adjust-hadiah-report.response.interface";
import { StockHadiahCardRepositoryPort } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.port";
import { InjectStockHadiahCardRepository } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.provider";
import { AdjustHadiahReportRequestDTO } from "../controller/dtos/adjust-hadiah-report.request.dto";
import { AdjustHadiahReportResponseDTO } from "../controller/dtos/adjust-hadiah-report.response.dto";

@Injectable()
export class AdjustHadiahReport
  extends BaseUseCase
  implements
    IUseCase<AdjustHadiahReportRequestDTO, AdjustHadiahReportResponseDTO[]>
{
  constructor(
    @InjectStockHadiahCardRepository
    private readonly stockHadiahCardRepository: StockHadiahCardRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: AdjustHadiahReportRequestDTO,
  ): Promise<AdjustHadiahReportResponseDTO[]> {
    try {
      const results = await this.stockHadiahCardRepository.reportAdjustHadiah(
        request,
      );

      return results.map(
        (report: IAdjustHadiahReportResponse) =>
          new AdjustHadiahReportResponseDTO(report),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
