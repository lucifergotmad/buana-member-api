import { Module } from "@nestjs/common";
import { StockHadiahCardRepositoryModule } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.module";
import { adjustHadiahReportUseCaseProvider } from "./adjust-hadiah-report.use-case.provider";

@Module({
  imports: [StockHadiahCardRepositoryModule],
  exports: adjustHadiahReportUseCaseProvider,
  providers: adjustHadiahReportUseCaseProvider,
})
export class AdjustHadiahReportUseCaseModule {}
