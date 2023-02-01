import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdjustHadiahConnectionName } from "src/core/constants/app/adjust-hadiah/conn-name.const";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { AdjustHadiahSchema } from "./model/adjust-hadiah.mongo-entity";

export const adjustHadiahEntityProviders: DynamicModule[] = [
  MongooseModule.forFeature(
    [{ name: "AdjustHadiahPrimaryDB", schema: AdjustHadiahSchema }],
    ConnectionName.DB_PRIMARY,
  ),
  MongooseModule.forFeature(
    [{ name: "AdjustHadiahOnlineDB", schema: AdjustHadiahSchema }],
    ConnectionName.DB_ONLINE,
  ),
];
