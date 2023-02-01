import { Module } from "@nestjs/common";
import { tukarPoinEntityProviders } from "./tukar-poin.entity.provider";
import { tukarPoinRepositoryProviders } from "./tukar-poin.repository.provider";

@Module({
  imports: tukarPoinEntityProviders,
  providers: tukarPoinRepositoryProviders,
  exports: tukarPoinRepositoryProviders,
})
export class TukarPoinRepositoryModule {}
