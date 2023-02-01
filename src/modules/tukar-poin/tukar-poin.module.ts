import { Module } from "@nestjs/common";
import { TukarPoinRepositoryModule } from "./database/tukar-poin.repository.module";
import { TukarPoinUseCaseModule } from "./use-cases/tukar-poin.use-case.module";
import { TukarPoinController } from "./controller/tukar-poin.controller";

@Module({
  imports: [TukarPoinUseCaseModule, TukarPoinRepositoryModule],
  controllers: [TukarPoinController],
})
export class TukarPoinModule {}
