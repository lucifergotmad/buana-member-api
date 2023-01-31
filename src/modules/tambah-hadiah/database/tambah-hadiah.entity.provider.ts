import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TambahHadiahConnectionName } from "src/core/constants/app/tambah-hadiah/conn-name.const";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { TambahHadiahSchema } from "./model/tambah-hadiah.mongo-entity";

export const tambahHadiahEntityProviders: DynamicModule[] = [
  MongooseModule.forFeature(
    [{ name: "TambahHadiahPrimaryDB", schema: TambahHadiahSchema }],
    ConnectionName.DB_PRIMARY,
  ),
  MongooseModule.forFeature(
    [{ name: "TambahHadiahOnlineDB", schema: TambahHadiahSchema }],
    ConnectionName.DB_ONLINE,
  ),
];
