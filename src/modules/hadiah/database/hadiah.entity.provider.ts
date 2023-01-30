import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HadiahConnectionName } from "src/core/constants/app/hadiah/conn-name.const";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { HadiahSchema } from "./model/hadiah.mongo-entity";

export const hadiahEntityProviders: DynamicModule[] = [
  MongooseModule.forFeature(
    [{ name: "HadiahPrimaryDB", schema: HadiahSchema }],
    ConnectionName.DB_PRIMARY,
  ),
  MongooseModule.forFeature(
    [{ name: "HadiahOnlineDB", schema: HadiahSchema }],
    ConnectionName.DB_ONLINE,
  ),
];
