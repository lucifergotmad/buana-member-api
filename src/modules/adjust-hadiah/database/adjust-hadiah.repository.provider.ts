import { Inject, Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdjustHadiahConnectionName } from "src/core/constants/app/adjust-hadiah/conn-name.const";
import { AdjustHadiahProviderName } from "src/core/constants/app/adjust-hadiah/provider-name.const";
import { AdjustHadiahMongoEntity } from "./model/adjust-hadiah.mongo-entity";
import { AdjustHadiahRepository } from "./adjust-hadiah.repository.service";

const adjustHadiahFactory = (adjustHadiah: Model<AdjustHadiahMongoEntity>) =>
  new AdjustHadiahRepository(adjustHadiah);

export const adjustHadiahRepositoryProviders: Provider[] = [
  {
    provide: AdjustHadiahProviderName.PRIMARY,
    useFactory: adjustHadiahFactory,
    inject: [getModelToken(AdjustHadiahConnectionName.PRIMARY)],
  },
  {
    provide: AdjustHadiahProviderName.ONLINE,
    useFactory: adjustHadiahFactory,
    inject: [getModelToken(AdjustHadiahConnectionName.ONLINE)],
  },
];
export const InjectAdjustHadiahRepository = Inject(
  AdjustHadiahProviderName.PRIMARY,
);
export const InjectAdjustHadiahRepositoryOnline = Inject(
  AdjustHadiahProviderName.ONLINE,
);
