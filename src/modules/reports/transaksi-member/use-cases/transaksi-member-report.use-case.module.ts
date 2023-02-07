import { Module } from "@nestjs/common";
import { PoinMemberCardRepositoryModule } from "src/modules/poin-member-card/database/poin-member-card.repository.module";
import { transaksiMemberReportUseCaseProviders } from "./transaksi-member-report.use-case.provider";

@Module({
  imports: [PoinMemberCardRepositoryModule],
  providers: transaksiMemberReportUseCaseProviders,
  exports: transaksiMemberReportUseCaseProviders,
})
export class TransaksiMemberReportUseCaseModule {}
