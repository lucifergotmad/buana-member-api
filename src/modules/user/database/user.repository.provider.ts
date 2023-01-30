import { Inject, Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserConnectionName } from "src/core/constants/app/user/conn-name.const";
import { UserProviderName } from "src/core/constants/app/user/provider-name.const";
import { UserMongoEntity } from "./model/user.mongo-entity";
import { UserRepository } from "./user.repository.service";

const userFactory = (user: Model<UserMongoEntity>) => new UserRepository(user);

export const userRepositoryProviders: Provider[] = [
  {
    provide: UserProviderName.PRIMARY,
    useFactory: userFactory,
    inject: [getModelToken(UserConnectionName.PRIMARY)],
  },
  {
    provide: UserProviderName.ONLINE,
    useFactory: userFactory,
    inject: [getModelToken(UserConnectionName.ONLINE)],
  },
];

export const InjectUserRepository = Inject(UserProviderName.PRIMARY);
export const InjectUserRepositoryOnline = Inject(UserProviderName.ONLINE);
