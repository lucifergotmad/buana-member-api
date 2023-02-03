import { Module } from "@nestjs/common";
import { PoinMemberCardUseCaseModule } from "src/modules/poin-member-card/use-cases/poin-member-card.use-case.module";
import { MemberRepositoryModule } from "../database/member.repository.module";
import { memberUseCaseProvider } from "./member.use-case.provider";

@Module({
  imports: [MemberRepositoryModule, PoinMemberCardUseCaseModule],
  exports: memberUseCaseProvider,
  providers: memberUseCaseProvider,
})
export class MemberUseCaseModule {}
