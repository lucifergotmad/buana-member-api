import { Module } from "@nestjs/common";
import { TukarPoinRepositoryModule } from "../database/tukar-poin.repository.module";
import { tukarPoinUseCaseProvider } from "./tukar-poin.use-case.provider";

@Module({
  imports: [TukarPoinRepositoryModule],
  exports: tukarPoinUseCaseProvider,
  providers: tukarPoinUseCaseProvider,
})
export class TukarPoinUseCaseModule {}
