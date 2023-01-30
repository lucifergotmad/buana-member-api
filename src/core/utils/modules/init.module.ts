import { CacheModule, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { EnvModule } from "src/infra/configs/env.module";
import { MemberRepositoryModule } from "src/modules/member/database/member.repository.module";
import { CacheUtil } from "./cache/cache.service";
import { DateUtil } from "./date/date.service";
import { GeneratorUtil } from "./generator/generator.service";
import { HashUtil } from "./hash/hash.service";
import { transactionOnlineProvider } from "./transaction-online/transaction-online.provider";
import { transactionProvider } from "./transaction/transaction.provider";

@Module({
  imports: [
    CacheModule.register(),
    ScheduleModule.forRoot(),
    EnvModule,
    MemberRepositoryModule,
  ],
  providers: [
    CacheUtil,
    DateUtil,
    HashUtil,
    GeneratorUtil,
    ...transactionProvider,
    ...transactionOnlineProvider,
  ],
  exports: [
    CacheUtil,
    DateUtil,
    HashUtil,
    GeneratorUtil,
    ...transactionProvider,
    ...transactionOnlineProvider,
  ],
})
export class InitModule {}
