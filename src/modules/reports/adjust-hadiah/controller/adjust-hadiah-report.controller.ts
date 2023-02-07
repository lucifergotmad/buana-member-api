import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { AdjustHadiahReport } from "../use-cases/adjust-hadiah-report.use-case";
import { AdjustHadiahReportRequestDTO } from "./dtos/adjust-hadiah-report.request.dto";
import { AdjustHadiahReportResponseDTO } from "./dtos/adjust-hadiah-report.response.dto";

@ControllerProperty("v1/reports/adjust-hadiah", "[Reports] Adjust Hadiah")
export class AdjustHadiahReportController {
  constructor(private readonly adjustHadiahReport: AdjustHadiahReport) {}

  @SecureGet()
  @ApiOkResponse({ type: AdjustHadiahReportResponseDTO, isArray: true })
  @APIQueryProperty(["start_date", "end_date"])
  report(@Query() query: AdjustHadiahReportRequestDTO) {
    return this.adjustHadiahReport.execute(query);
  }
}
