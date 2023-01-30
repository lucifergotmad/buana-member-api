import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { ClientSession, Connection } from "mongoose";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { ITransactionOnlineUtil } from "./transaction-online-interface";

@Injectable()
export class TransactionOnlineUtil implements ITransactionOnlineUtil {
  constructor(
    @InjectConnection(ConnectionName.DB_ONLINE)
    private readonly connection: Connection,
  ) {}

  async startTransaction(): Promise<ClientSession> {
    const session: ClientSession = await this.connection.startSession();
    return session;
  }

  async commitTransaction(session: ClientSession): Promise<void> {
    await session.commitTransaction();
    await session.endSession();
  }

  async rollbackTransaction(session: ClientSession): Promise<void> {
    await session.abortTransaction();
    await session.endSession();
  }
}
