import { Module } from "@nestjs/common";
import { stockHadiahCardEntityProviders } from "./stock-hadiah-card.entity.provider";
import { stockHadiahCardRepositoryProviders } from "./stock-hadiah-card.repository.provider";

@Module({
  imports: stockHadiahCardEntityProviders,
  providers: stockHadiahCardRepositoryProviders,
  exports: stockHadiahCardRepositoryProviders,
})
export class StockHadiahCardRepositoryModule {}
