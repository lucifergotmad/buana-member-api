import { Module } from "@nestjs/common";
import { PoinMemberCardRepositoryModule } from "../database/poin-member-card.repository.module";
import { poinMemberCardUseCaseProvider } from "./poin-member-card.use-case.provider";

@Module({
  imports: [PoinMemberCardRepositoryModule],
  exports: poinMemberCardUseCaseProvider,
  providers: poinMemberCardUseCaseProvider,
})
export class PoinMemberCardUseCaseModule {}
