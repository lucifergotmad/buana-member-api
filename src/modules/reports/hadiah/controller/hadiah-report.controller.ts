import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { HistoryStockHadiahReport } from "../use-cases/history-stock-hadiah-report.use-case";
import { StockHadiahReport } from "../use-cases/stock-hadiah-report.use-case";
import { HistoryStockHadiahRequestDTO } from "./dtos/history-stock-hadiah.request.dto";
import { HistoryStockHadiahResponseDTO } from "./dtos/history-stock-hadiah.response.dto";
import { StockHadiahReportRequestDTO } from "./dtos/stock-hadiah-report.request.dto";
import { StockHadiahReportResponseDTO } from "./dtos/stock-hadiah-report.response.dto";

@ControllerProperty("v1/reports/hadiah", "[Reports] Hadiah")
export class HadiahReportController {
  constructor(
    private readonly stockHadiahReport: StockHadiahReport,
    private readonly historyStockHadiahReport: HistoryStockHadiahReport,
  ) {}

  @SecureGet("stock")
  @ApiOkResponse({ type: StockHadiahReportResponseDTO, isArray: true })
  @APIQueryProperty(["start_date"])
  report(@Query() query: StockHadiahReportRequestDTO) {
    return this.stockHadiahReport.execute(query);
  }

  @SecureGet("history")
  @ApiOkResponse({ type: HistoryStockHadiahResponseDTO, isArray: true })
  @APIQueryProperty(["start_date", "end_date", "kode_hadiah"])
  historyReport(@Query() query: HistoryStockHadiahRequestDTO) {
    return this.historyStockHadiahReport.execute(query);
  }
}
