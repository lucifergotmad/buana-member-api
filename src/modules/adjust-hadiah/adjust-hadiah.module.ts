import { Module } from "@nestjs/common";
import { AdjustHadiahRepositoryModule } from "./database/adjust-hadiah.repository.module";
import { AdjustHadiahUseCaseModule } from "./use-cases/adjust-hadiah.use-case.module";
import { AdjustHadiahController } from "./controller/adjust-hadiah.controller";

@Module({
  imports: [AdjustHadiahUseCaseModule, AdjustHadiahRepositoryModule],
  controllers: [AdjustHadiahController],
})
export class AdjustHadiahModule {}
