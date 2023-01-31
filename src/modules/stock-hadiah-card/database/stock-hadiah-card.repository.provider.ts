import { Inject, Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StockHadiahCardConnectionName } from "src/core/constants/app/stock-hadiah-card/conn-name.const";
import { StockHadiahCardProviderName } from "src/core/constants/app/stock-hadiah-card/provider-name.const";
import { StockHadiahCardMongoEntity } from "./model/stock-hadiah-card.mongo-entity";
import { StockHadiahCardRepository } from "./stock-hadiah-card.repository.service";

const stockHadiahCardFactory = (
  stockHadiahCard: Model<StockHadiahCardMongoEntity>,
) => new StockHadiahCardRepository(stockHadiahCard);

export const stockHadiahCardRepositoryProviders: Provider[] = [
  {
    provide: StockHadiahCardProviderName.PRIMARY,
    useFactory: stockHadiahCardFactory,
    inject: [getModelToken(StockHadiahCardConnectionName.PRIMARY)],
  },
  {
    provide: StockHadiahCardProviderName.ONLINE,
    useFactory: stockHadiahCardFactory,
    inject: [getModelToken(StockHadiahCardConnectionName.ONLINE)],
  },
];
export const InjectStockHadiahCardRepository = Inject(
  StockHadiahCardProviderName.PRIMARY,
);
export const InjectStockHadiahCardRepositoryOnline = Inject(
  StockHadiahCardProviderName.ONLINE,
);
