import { Module } from "@nestjs/common";
import { adjustHadiahEntityProviders } from "./adjust-hadiah.entity.provider";
import { adjustHadiahRepositoryProviders } from "./adjust-hadiah.repository.provider";

@Module({
  imports: adjustHadiahEntityProviders,
  providers: adjustHadiahRepositoryProviders,
  exports: adjustHadiahRepositoryProviders,
})
export class AdjustHadiahRepositoryModule {}
