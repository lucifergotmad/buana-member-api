import { Inject, Injectable } from "@nestjs/common";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { IUtils } from "./utils.interface";
import { DateUtil } from "./modules/date/date.service";
import { TransactionUtil } from "./modules/transaction/transaction.service";
import { HashUtil } from "./modules/hash/hash.service";
import { CacheUtil } from "./modules/cache/cache.service";
import { GeneratorUtil } from "./modules/generator/generator.service";
import { TransactionOnlineUtil } from "./modules/transaction-online/transaction-online.service";

@Injectable()
export class Utils implements IUtils {
  constructor(
    readonly cache: CacheUtil,
    readonly date: DateUtil,
    readonly hash: HashUtil,
    readonly generator: GeneratorUtil,
    @Inject(ConnectionName.DB_PRIMARY) readonly transaction: TransactionUtil,
    @Inject(ConnectionName.DB_ONLINE)
    readonly transactionOnline: TransactionOnlineUtil,
  ) {}
}
