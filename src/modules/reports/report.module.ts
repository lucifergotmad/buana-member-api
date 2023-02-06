import { Module } from "@nestjs/common";
import { HadiahReportController } from "./hadiah/controller/hadiah-report.controller";
import { HadiahReportUseCaseModule } from "./hadiah/use-cases/hadiah-report.use-case.module";
import { MemberReportController } from "./member/controller/member-report.controller";
import { MemberReportUseCaseModule } from "./member/use-cases/member-report.use-case.module";

@Module({
  imports: [MemberReportUseCaseModule, HadiahReportUseCaseModule],
  controllers: [MemberReportController, HadiahReportController],
})
export class ReportModule {}
