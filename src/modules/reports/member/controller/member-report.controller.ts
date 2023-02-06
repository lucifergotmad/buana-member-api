import { Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { ReportDataMember } from "../use-cases/report-data-member.use-case";
import { ReportDataMemberRequestDTO } from "./dtos/report-data-member.request.dto";
import { ReportDataMemberResponseDTO } from "./dtos/report-data-member.response.dto";

@ControllerProperty("v1/reports/member", "[Reports] Member")
export class MemberReportController {
  constructor(private readonly reportDataMember: ReportDataMember) {}

  @SecureGet()
  @APIQueryProperty(["status_member", "sort_by"])
  @ApiOkResponse({ type: ReportDataMemberResponseDTO })
  @ApiBadRequestResponse({ description: "Query tidak valid!" })
  report(@Query() query: ReportDataMemberRequestDTO) {
    return this.reportDataMember.execute(query);
  }
}
