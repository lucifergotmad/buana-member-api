import { Module } from "@nestjs/common";
import { HadiahRepositoryModule } from "src/modules/hadiah/database/hadiah.repository.module";
import { MemberRepositoryModule } from "src/modules/member/database/member.repository.module";
import { PoinMemberCardUseCaseModule } from "src/modules/poin-member-card/use-cases/poin-member-card.use-case.module";
import { StockHadiahCardUseCaseModule } from "src/modules/stock-hadiah-card/use-cases/stock-hadiah-card.use-case.module";
import { TukarPoinRepositoryModule } from "../database/tukar-poin.repository.module";
import { tukarPoinUseCaseProvider } from "./tukar-poin.use-case.provider";

@Module({
  imports: [
    TukarPoinRepositoryModule,
    HadiahRepositoryModule,
    MemberRepositoryModule,
    PoinMemberCardUseCaseModule,
    StockHadiahCardUseCaseModule,
  ],
  exports: tukarPoinUseCaseProvider,
  providers: tukarPoinUseCaseProvider,
})
export class TukarPoinUseCaseModule {}
