import { Module } from "@nestjs/common";
import { StockHadiahCardRepositoryModule } from "../database/stock-hadiah-card.repository.module";
import { stockHadiahCardUseCaseProvider } from "./stock-hadiah-card.use-case.provider";

@Module({
  imports: [StockHadiahCardRepositoryModule],
  exports: stockHadiahCardUseCaseProvider,
  providers: stockHadiahCardUseCaseProvider,
})
export class StockHadiahCardUseCaseModule {}
