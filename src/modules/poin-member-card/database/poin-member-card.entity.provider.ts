import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PoinMemberCardConnectionName } from "src/core/constants/app/poin-member-card/conn-name.const";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { PoinMemberCardSchema } from "./model/poin-member-card.mongo-entity";

export const poinMemberCardEntityProviders: DynamicModule[] = [
  MongooseModule.forFeature(
    [{ name: "PoinMemberCardPrimaryDB", schema: PoinMemberCardSchema }],
    ConnectionName.DB_PRIMARY,
  ),
  MongooseModule.forFeature(
    [{ name: "PoinMemberCardOnlineDB", schema: PoinMemberCardSchema }],
    ConnectionName.DB_ONLINE,
  ),
];
