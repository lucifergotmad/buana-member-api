import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { StockHadiahReport } from "../use-cases/stock-hadiah-report.use-case";
import { StockHadiahReportRequestDTO } from "./dtos/stock-hadiah-report.request.dto";
import { StockHadiahReportResponseDTO } from "./dtos/stock-hadiah-report.response.dto";

@ControllerProperty("v1/reports/hadiah", "[Reports] Hadiah")
export class HadiahReportController {
  constructor(private readonly stockHadiahReport: StockHadiahReport) {}

  @SecureGet("stock")
  @ApiOkResponse({ type: StockHadiahReportResponseDTO, isArray: true })
  @APIQueryProperty(["start_date"])
  report(@Query() query: StockHadiahReportRequestDTO) {
    return this.stockHadiahReport.execute(query);
  }
}
