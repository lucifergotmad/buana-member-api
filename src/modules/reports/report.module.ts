import { Module } from "@nestjs/common";
import { HadiahReportModule } from "./hadiah/hadiah-report.module";
import { MemberReportModule } from "./member/member-report.module";

@Module({
  imports: [HadiahReportModule, MemberReportModule],
})
export class ReportModule {}
