import { CacheModule, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { EnvModule } from "src/infra/configs/env.module";
import { MemberUseCaseModule } from "src/modules/member/use-cases/member.use-case.module";
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
    MemberUseCaseModule,
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
