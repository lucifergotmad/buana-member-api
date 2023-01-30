import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserConnectionName } from "src/core/constants/app/user/conn-name.const";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { UserSchema } from "./model/user.mongo-entity";

export const userEntityProviders: DynamicModule[] = [
  MongooseModule.forFeature(
    [{ name: UserConnectionName.PRIMARY, schema: UserSchema }],
    ConnectionName.DB_PRIMARY,
  ),
  MongooseModule.forFeature(
    [{ name: UserConnectionName.ONLINE, schema: UserSchema }],
    ConnectionName.DB_ONLINE,
  ),
];
