import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StockHadiahCardConnectionName } from "src/core/constants/app/stock-hadiah-card/conn-name.const";
import { ConnectionName } from "src/core/constants/database/connection-name.const";
import { StockHadiahCardSchema } from "./model/stock-hadiah-card.mongo-entity";

export const stockHadiahCardEntityProviders: DynamicModule[] = [
  MongooseModule.forFeature(
    [{ name: "StockHadiahCardPrimaryDB", schema: StockHadiahCardSchema }],
    ConnectionName.DB_PRIMARY,
  ),
  MongooseModule.forFeature(
    [{ name: "StockHadiahCardOnlineDB", schema: StockHadiahCardSchema }],
    ConnectionName.DB_ONLINE,
  ),
];
