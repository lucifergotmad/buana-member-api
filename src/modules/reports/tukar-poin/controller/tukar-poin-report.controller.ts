import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { TukarPoinReport } from "../use-cases/tukar-poin-report.use-case";
import { TukarPoinReportRequestDTO } from "./dtos/tukar-poin-report.request.dto";
import { TukarPoinReportResponseDTO } from "./dtos/tukar-poin-report.response.dto";

@ControllerProperty("v1/reports/tukar-poin", "[Reports] Tukar Poin")
export class TukarPoinReportController {
  constructor(private readonly tukarPoinReport: TukarPoinReport) {}

  @SecureGet()
  @ApiOkResponse({ type: TukarPoinReportResponseDTO, isArray: true })
  @APIQueryProperty(["start_date", "end_date"])
  report(@Query() query: TukarPoinReportRequestDTO) {
    return this.tukarPoinReport.execute(query);
  }
}
