import { Module } from "@nestjs/common";
import { TambahHadiahRepositoryModule } from "../database/tambah-hadiah.repository.module";
import { tambahHadiahUseCaseProvider } from "./tambah-hadiah.use-case.provider";

@Module({
  imports: [TambahHadiahRepositoryModule],
  exports: tambahHadiahUseCaseProvider,
  providers: tambahHadiahUseCaseProvider,
})
export class TambahHadiahUseCaseModule {}
