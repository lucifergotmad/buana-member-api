import { Module } from "@nestjs/common";
import { AdjustHadiahReportModule } from "./adjust-hadiah/adjust-hadiah-report.module";
import { HadiahReportModule } from "./hadiah/hadiah-report.module";
import { MemberReportModule } from "./member/member-report.module";
import { TukarPoinReportModule } from "./tukar-poin/tukar-poin-report.module";

@Module({
  imports: [
    HadiahReportModule,
    MemberReportModule,
    TukarPoinReportModule,
    AdjustHadiahReportModule,
  ],
})
export class ReportModule {}
