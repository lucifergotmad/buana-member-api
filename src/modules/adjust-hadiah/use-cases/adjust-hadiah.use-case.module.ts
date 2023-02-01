import { Module } from "@nestjs/common";
import { HadiahRepositoryModule } from "src/modules/hadiah/database/hadiah.repository.module";
import { StockHadiahCardRepositoryModule } from "src/modules/stock-hadiah-card/database/stock-hadiah-card.repository.module";
import { StockHadiahCardUseCaseModule } from "src/modules/stock-hadiah-card/use-cases/stock-hadiah-card.use-case.module";
import { AdjustHadiahRepositoryModule } from "../database/adjust-hadiah.repository.module";
import { adjustHadiahUseCaseProvider } from "./adjust-hadiah.use-case.provider";

@Module({
  imports: [
    AdjustHadiahRepositoryModule,
    StockHadiahCardUseCaseModule,
    StockHadiahCardRepositoryModule,
    HadiahRepositoryModule,
  ],
  exports: adjustHadiahUseCaseProvider,
  providers: adjustHadiahUseCaseProvider,
})
export class AdjustHadiahUseCaseModule {}
