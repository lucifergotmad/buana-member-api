import { Module } from "@nestjs/common";
import { HadiahRepositoryModule } from "src/modules/hadiah/database/hadiah.repository.module";
import { StockHadiahCardRepositoryModule } from "../database/stock-hadiah-card.repository.module";
import { stockHadiahCardUseCaseProvider } from "./stock-hadiah-card.use-case.provider";

@Module({
  imports: [StockHadiahCardRepositoryModule, HadiahRepositoryModule],
  exports: stockHadiahCardUseCaseProvider,
  providers: stockHadiahCardUseCaseProvider,
})
export class StockHadiahCardUseCaseModule {}
