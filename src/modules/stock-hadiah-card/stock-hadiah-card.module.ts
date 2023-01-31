import { Module } from "@nestjs/common";
import { StockHadiahCardRepositoryModule } from "./database/stock-hadiah-card.repository.module";
import { StockHadiahCardUseCaseModule } from "./use-cases/stock-hadiah-card.use-case.module";

@Module({
  imports: [StockHadiahCardUseCaseModule, StockHadiahCardRepositoryModule],
  controllers: [],
})
export class StockHadiahCardModule {}
