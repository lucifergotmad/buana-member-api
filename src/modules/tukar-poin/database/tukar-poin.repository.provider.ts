import { Inject, Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TukarPoinConnectionName } from "src/core/constants/app/tukar-poin/conn-name.const";
import { TukarPoinProviderName } from "src/core/constants/app/tukar-poin/provider-name.const";
import { TukarPoinMongoEntity } from "./model/tukar-poin.mongo-entity";
import { TukarPoinRepository } from "./tukar-poin.repository.service";

const tukarPoinFactory = (tukarPoin: Model<TukarPoinMongoEntity>) =>
  new TukarPoinRepository(tukarPoin);

export const tukarPoinRepositoryProviders: Provider[] = [
  {
    provide: TukarPoinProviderName.PRIMARY,
    useFactory: tukarPoinFactory,
    inject: [getModelToken(TukarPoinConnectionName.PRIMARY)],
  },
  {
    provide: TukarPoinProviderName.ONLINE,
    useFactory: tukarPoinFactory,
    inject: [getModelToken(TukarPoinConnectionName.ONLINE)],
  },
];
export const InjectTukarPoinRepository = Inject(TukarPoinProviderName.PRIMARY);
export const InjectTukarPoinRepositoryOnline = Inject(
  TukarPoinProviderName.ONLINE,
);
