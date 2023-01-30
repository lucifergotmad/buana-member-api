import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MemberConnectionName } from "src/core/constants/app/member/conn-name.const";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { MemberSchema } from "./model/member.mongo-entity";

export const memberEntityProviders: DynamicModule[] = [
  MongooseModule.forFeature(
    [{ name: "MemberPrimaryDB", schema: MemberSchema }],
    ConnectionName.DB_PRIMARY,
  ),
  MongooseModule.forFeature(
    [{ name: "MemberOnlineDB", schema: MemberSchema }],
    ConnectionName.DB_ONLINE,
  ),
];
