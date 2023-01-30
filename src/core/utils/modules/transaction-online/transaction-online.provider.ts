import { getConnectionToken } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { TransactionOnlineUtil } from "./transaction-online.service";

export const transactionOnlineProvider = [
  {
    provide: ConnectionName.DB_ONLINE,
    useFactory: (primaryConnection: Connection) =>
      new TransactionOnlineUtil(primaryConnection),
    inject: [getConnectionToken(ConnectionName.DB_ONLINE)],
  },
];
