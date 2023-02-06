import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IStockHadiahResponse } from "src/interface-adapter/interfaces/reports/hadiah/stock-hadiah-report.response.interface";
import { StockHadiahCardRepositoryPort } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.port";
import { InjectStockHadiahCardRepository } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.provider";
import { StockHadiahReportRequestDTO } from "../controller/dtos/stock-hadiah-report.request.dto";
import { StockHadiahReportResponseDTO } from "../controller/dtos/stock-hadiah-report.response.dto";

@Injectable()
export class StockHadiahReport
  extends BaseUseCase
  implements
    IUseCase<StockHadiahReportRequestDTO, StockHadiahReportResponseDTO[]>
{
  constructor(
    @InjectStockHadiahCardRepository
    private readonly stockHadiahCardRepository: StockHadiahCardRepositoryPort,
  ) {
    super();
  }

  async execute({
    start_date,
  }: StockHadiahReportRequestDTO): Promise<StockHadiahReportResponseDTO[]> {
    try {
      const results = await this.stockHadiahCardRepository.reportStockHadiah(
        start_date,
      );

      return results.map(
        (report: IStockHadiahResponse) =>
          new StockHadiahReportResponseDTO(report),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
