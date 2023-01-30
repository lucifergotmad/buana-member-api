import { Module } from "@nestjs/common";
import { HadiahRepositoryModule } from "../database/hadiah.repository.module";
import { hadiahUseCaseProvider } from "./hadiah.use-case.provider";

@Module({
  imports: [HadiahRepositoryModule],
  exports: hadiahUseCaseProvider,
  providers: hadiahUseCaseProvider,
})
export class HadiahUseCaseModule {}
