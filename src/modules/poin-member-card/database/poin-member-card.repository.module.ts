import { Module } from "@nestjs/common";
import { poinMemberCardEntityProviders } from "./poin-member-card.entity.provider";
import { poinMemberCardRepositoryProviders } from "./poin-member-card.repository.provider";

@Module({
  imports: poinMemberCardEntityProviders,
  providers: poinMemberCardRepositoryProviders,
  exports: poinMemberCardRepositoryProviders,
})
export class PoinMemberCardRepositoryModule {}
