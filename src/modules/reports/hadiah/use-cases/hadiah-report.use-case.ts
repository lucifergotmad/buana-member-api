import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IHadiahReportResponse } from "src/interface-adapter/interfaces/reports/hadiah/hadiah-report.response.interface";
import { StockHadiahCardRepositoryPort } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.port";
import { InjectStockHadiahCardRepository } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.provider";
import { HadiahReportRequestDTO } from "../controller/dtos/hadiah-report.request.dto";
import { HadiahReportResponseDTO } from "../controller/dtos/hadiah-report.response.dto";

@Injectable()
export class HadiahReport
  extends BaseUseCase
  implements IUseCase<HadiahReportRequestDTO, HadiahReportResponseDTO[]>
{
  constructor(
    @InjectStockHadiahCardRepository
    private readonly stockHadiahCardRepository: StockHadiahCardRepositoryPort,
  ) {
    super();
  }

  async execute({
    start_date,
  }: HadiahReportRequestDTO): Promise<HadiahReportResponseDTO[]> {
    try {
      const results = await this.stockHadiahCardRepository.reportStockHadiah(
        start_date,
      );

      return results.map(
        (report: IHadiahReportResponse) => new HadiahReportResponseDTO(report),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
