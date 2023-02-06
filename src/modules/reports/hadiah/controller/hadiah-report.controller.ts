import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { HadiahReport } from "../use-cases/hadiah-report.use-case";
import { HadiahReportRequestDTO } from "./dtos/hadiah-report.request.dto";
import { HadiahReportResponseDTO } from "./dtos/hadiah-report.response.dto";

@ControllerProperty("v1/reports/hadiah", "[Reports] Hadiah")
export class HadiahReportController {
  constructor(private readonly hadiahReport: HadiahReport) {}

  @SecureGet()
  @ApiOkResponse({ type: HadiahReportResponseDTO, isArray: true })
  @APIQueryProperty(["start_date"])
  report(@Query() query: HadiahReportRequestDTO) {
    return this.hadiahReport.execute(query);
  }
}
