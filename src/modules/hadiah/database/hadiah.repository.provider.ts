import { Inject, Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HadiahConnectionName } from "src/core/constants/app/hadiah/conn-name.const";
import { HadiahProviderName } from "src/core/constants/app/hadiah/provider-name.const";
import { HadiahMongoEntity } from "./model/hadiah.mongo-entity";
import { HadiahRepository } from "./hadiah.repository.service";

const hadiahFactory = (hadiah: Model<HadiahMongoEntity>) =>
  new HadiahRepository(hadiah);

export const hadiahRepositoryProviders: Provider[] = [
  {
    provide: HadiahProviderName.PRIMARY,
    useFactory: hadiahFactory,
    inject: [getModelToken(HadiahConnectionName.PRIMARY)],
  },
  {
    provide: HadiahProviderName.ONLINE,
    useFactory: hadiahFactory,
    inject: [getModelToken(HadiahConnectionName.ONLINE)],
  },
];
export const InjectHadiahRepository = Inject(HadiahProviderName.PRIMARY);
export const InjectHadiahRepositoryOnline = Inject(HadiahProviderName.ONLINE);
