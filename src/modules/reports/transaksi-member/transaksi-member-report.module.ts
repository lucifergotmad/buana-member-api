import { Module } from "@nestjs/common";
import { TransaksiMemberReportController } from "./controller/transaksi-member-report.use-case";
import { TransaksiMemberReportUseCaseModule } from "./use-cases/transaksi-member-report.use-case.module";

@Module({
  imports: [TransaksiMemberReportUseCaseModule],
  controllers: [TransaksiMemberReportController],
})
export class TransaksiMemberReportModule {}
