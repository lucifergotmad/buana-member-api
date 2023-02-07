import { Module } from "@nestjs/common";
import { PoinMemberCardRepositoryModule } from "src/modules/poin-member-card/database/poin-member-card.repository.module";
import { tukarPoinReportUseCaseProviders } from "./tukar-poin-report.use-case.provider";

@Module({
  imports: [PoinMemberCardRepositoryModule],
  exports: tukarPoinReportUseCaseProviders,
  providers: tukarPoinReportUseCaseProviders,
})
export class TukarPoinReportUseCaseModule {}
