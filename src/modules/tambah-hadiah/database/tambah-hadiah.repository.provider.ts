import { Inject, Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TambahHadiahConnectionName } from "src/core/constants/app/tambah-hadiah/conn-name.const";
import { TambahHadiahProviderName } from "src/core/constants/app/tambah-hadiah/provider-name.const";
import { TambahHadiahMongoEntity } from "./model/tambah-hadiah.mongo-entity";
import { TambahHadiahRepository } from "./tambah-hadiah.repository.service";

const tambahHadiahFactory = (tambahHadiah: Model<TambahHadiahMongoEntity>) =>
  new TambahHadiahRepository(tambahHadiah);

export const tambahHadiahRepositoryProviders: Provider[] = [
  {
    provide: TambahHadiahProviderName.PRIMARY,
    useFactory: tambahHadiahFactory,
    inject: [getModelToken(TambahHadiahConnectionName.PRIMARY)],
  },
  {
    provide: TambahHadiahProviderName.ONLINE,
    useFactory: tambahHadiahFactory,
    inject: [getModelToken(TambahHadiahConnectionName.ONLINE)],
  },
];
export const InjectTambahHadiahRepository = Inject(
  TambahHadiahProviderName.PRIMARY,
);
export const InjectTambahHadiahRepositoryOnline = Inject(
  TambahHadiahProviderName.ONLINE,
);
