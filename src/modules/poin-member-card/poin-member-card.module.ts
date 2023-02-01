import { Module } from "@nestjs/common";
import { PoinMemberCardRepositoryModule } from "./database/poin-member-card.repository.module";
import { PoinMemberCardUseCaseModule } from "./use-cases/poin-member-card.use-case.module";

@Module({
  imports: [PoinMemberCardUseCaseModule, PoinMemberCardRepositoryModule],
  controllers: [],
})
export class PoinMemberCardModule {}
