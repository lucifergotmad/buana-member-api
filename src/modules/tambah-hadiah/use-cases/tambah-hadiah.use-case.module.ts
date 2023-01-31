import { Module } from "@nestjs/common";
import { StockHadiahCardUseCaseModule } from "src/modules/stock-hadiah-card/use-cases/stock-hadiah-card.use-case.module";
import { TambahHadiahRepositoryModule } from "../database/tambah-hadiah.repository.module";
import { tambahHadiahUseCaseProvider } from "./tambah-hadiah.use-case.provider";

@Module({
  imports: [TambahHadiahRepositoryModule, StockHadiahCardUseCaseModule],
  exports: tambahHadiahUseCaseProvider,
  providers: tambahHadiahUseCaseProvider,
})
export class TambahHadiahUseCaseModule {}
