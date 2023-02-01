import { Module } from "@nestjs/common";
import { PoinMemberCardRepositoryModule } from "./database/poin-member-card.repository.module";
import { PoinMemberCardUseCaseModule } from "./use-cases/poin-member-card.use-case.module";
import { PoinMemberCardController } from "./controller/poin-member-card.controller";

@Module({
  imports: [PoinMemberCardUseCaseModule, PoinMemberCardRepositoryModule],
  controllers: [PoinMemberCardController],
})
export class PoinMemberCardModule {}
