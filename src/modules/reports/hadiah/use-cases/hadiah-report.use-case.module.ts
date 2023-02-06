import { Module } from "@nestjs/common";
import { StockHadiahCardRepositoryModule } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.module";
import { hadiahReportUseCaseProvider } from "./hadiah-report.use-case.provider";

@Module({
  imports: [StockHadiahCardRepositoryModule],
  exports: hadiahReportUseCaseProvider,
  providers: hadiahReportUseCaseProvider,
})
export class HadiahReportUseCaseModule {}
