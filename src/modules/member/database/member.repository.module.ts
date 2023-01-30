import { Module } from "@nestjs/common";
import { memberEntityProviders } from "./member.entity.provider";
import { memberRepositoryProviders } from "./member.repository.provider";

@Module({
  imports: memberEntityProviders,
  providers: memberRepositoryProvider,
  exports: memberRepositoryProvider,
})
export class MemberRepositoryModule {}
