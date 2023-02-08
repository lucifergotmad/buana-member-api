import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { TransaksiMemberReport } from "../use-cases/transaksi-member-report.use-case";
import { TransaksiMemberReportRequestDTO } from "./dtos/transaksi-member-report.request.dto";
import { TransaksiMemberReportResponseDTO } from "./dtos/transaksi-member-report.response.dto";

@ControllerProperty("v1/reports/transaksi-member", "[Reports] Transaksi Member")
export class TransaksiMemberReportController {
  constructor(private readonly transaksiMemberReport: TransaksiMemberReport) {}

  @SecureGet()
  @ApiOkResponse({ type: TransaksiMemberReportResponseDTO, isArray: true })
  @APIQueryProperty([
    "start_date",
    "end_date",
    "kategori",
    "kode_member",
    "tipe",
  ])
  report(@Query() query: TransaksiMemberReportRequestDTO) {
    return this.transaksiMemberReport.execute(query);
  }
}
