import { Module } from "@nestjs/common";
import { memberEntityProviders } from "./member.entity.provider";
import { memberRepositoryProviders } from "./member.repository.provider";

@Module({
  imports: memberEntityProviders,
  providers: memberRepositoryProviders,
  exports: memberRepositoryProviders,
})
export class MemberRepositoryModule {}
