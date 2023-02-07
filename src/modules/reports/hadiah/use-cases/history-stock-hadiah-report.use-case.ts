import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IHistoryStockHadiahResponse } from "src/interface-adapter/interfaces/reports/hadiah/history-stock-hadiah.response.interface";
import { StockHadiahCardRepositoryPort } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.port";
import { InjectStockHadiahCardRepository } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.provider";
import { HistoryStockHadiahRequestDTO } from "../controller/dtos/history-stock-hadiah.request.dto";
import { HistoryStockHadiahResponseDTO } from "../controller/dtos/history-stock-hadiah.response.dto";

@Injectable()
export class HistoryStockHadiahReport
  extends BaseUseCase
  implements
    IUseCase<HistoryStockHadiahRequestDTO, HistoryStockHadiahResponseDTO[]>
{
  constructor(
    @InjectStockHadiahCardRepository
    private readonly stockHadiahCardRepository: StockHadiahCardRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: HistoryStockHadiahRequestDTO,
  ): Promise<HistoryStockHadiahResponseDTO[]> {
    try {
      const results =
        await this.stockHadiahCardRepository.reportHistoryStockHadiah(request);

      return results.map(
        (report: IHistoryStockHadiahResponse) =>
          new HistoryStockHadiahResponseDTO(report),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
