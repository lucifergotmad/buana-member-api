import { Module } from "@nestjs/common";
import { hadiahEntityProviders } from "./hadiah.entity.provider";
import { hadiahRepositoryProviders } from "./hadiah.repository.provider";

@Module({
  imports: hadiahEntityProviders,
  providers: hadiahRepositoryProviders,
  exports: hadiahRepositoryProviders,
})
export class HadiahRepositoryModule {}
