import { Module } from "@nestjs/common";
import { MemberRepositoryModule } from "src/modules/member/database/member.repository.module";
import { memberReportUseCaseProvider } from "./member-report.use-case.provider";

@Module({
  imports: [MemberRepositoryModule],
  exports: memberReportUseCaseProvider,
  providers: memberReportUseCaseProvider,
})
export class MemberReportUseCaseModule {}
