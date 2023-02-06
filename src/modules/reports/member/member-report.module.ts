import { Module } from "@nestjs/common";
import { MemberReportController } from "./controller/member-report.controller";
import { MemberReportUseCaseModule } from "./use-cases/member-report.use-case.module";

@Module({
  imports: [MemberReportUseCaseModule],
  controllers: [MemberReportController],
})
export class MemberReportModule {}
