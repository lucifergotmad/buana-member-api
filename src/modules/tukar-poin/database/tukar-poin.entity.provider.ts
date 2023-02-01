import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TukarPoinConnectionName } from "src/core/constants/app/tukar-poin/conn-name.const";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { TukarPoinSchema } from "./model/tukar-poin.mongo-entity";

export const tukarPoinEntityProviders: DynamicModule[] = [
  MongooseModule.forFeature(
    [{ name: "TukarPoinPrimaryDB", schema: TukarPoinSchema }],
    ConnectionName.DB_PRIMARY,
  ),
  MongooseModule.forFeature(
    [{ name: "TukarPoinOnlineDB", schema: TukarPoinSchema }],
    ConnectionName.DB_ONLINE,
  ),
];
