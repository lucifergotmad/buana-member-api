import { Module } from "@nestjs/common";
import { tambahHadiahEntityProviders } from "./tambah-hadiah.entity.provider";
import { tambahHadiahRepositoryProviders } from "./tambah-hadiah.repository.provider";

@Module({
  imports: tambahHadiahEntityProviders,
  providers: tambahHadiahRepositoryProviders,
  exports: tambahHadiahRepositoryProviders,
})
export class TambahHadiahRepositoryModule {}
