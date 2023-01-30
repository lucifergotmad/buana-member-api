import { Module } from "@nestjs/common";
import { userEntityProviders } from "./user.entity.provider";
import { userRepositoryProviders } from "./user.repository.provider";

@Module({
  imports: userEntityProviders,
  providers: userRepositoryProviders,
  exports: userRepositoryProviders,
})
export class UserRepositoryModule {}
