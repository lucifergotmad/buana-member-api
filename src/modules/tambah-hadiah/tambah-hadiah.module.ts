import { Module } from "@nestjs/common";
import { TambahHadiahRepositoryModule } from "./database/tambah-hadiah.repository.module";
import { TambahHadiahUseCaseModule } from "./use-cases/tambah-hadiah.use-case.module";
import { TambahHadiahController } from "./controller/tambah-hadiah.controller";

@Module({
  imports: [TambahHadiahUseCaseModule, TambahHadiahRepositoryModule],
  controllers: [TambahHadiahController],
})
export class TambahHadiahModule {}
