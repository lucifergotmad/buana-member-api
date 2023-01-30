import { Module } from "@nestjs/common";
import { HadiahRepositoryModule } from "./database/hadiah.repository.module";
import { HadiahUseCaseModule } from "./use-cases/hadiah.use-case.module";
import { HadiahController } from "./controller/hadiah.controller";

@Module({
  imports: [HadiahUseCaseModule, HadiahRepositoryModule],
  controllers: [HadiahController],
})
export class HadiahModule {}
