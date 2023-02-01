import { Inject, Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PoinMemberCardConnectionName } from "src/core/constants/app/poin-member-card/conn-name.const";
import { PoinMemberCardProviderName } from "src/core/constants/app/poin-member-card/provider-name.const";
import { PoinMemberCardMongoEntity } from "./model/poin-member-card.mongo-entity";
import { PoinMemberCardRepository } from "./poin-member-card.repository.service";

const poinMemberCardFactory = (
  poinMemberCard: Model<PoinMemberCardMongoEntity>,
) => new PoinMemberCardRepository(poinMemberCard);

export const poinMemberCardRepositoryProviders: Provider[] = [
  {
    provide: PoinMemberCardProviderName.PRIMARY,
    useFactory: poinMemberCardFactory,
    inject: [getModelToken(PoinMemberCardConnectionName.PRIMARY)],
  },
  {
    provide: PoinMemberCardProviderName.ONLINE,
    useFactory: poinMemberCardFactory,
    inject: [getModelToken(PoinMemberCardConnectionName.ONLINE)],
  },
];
export const InjectPoinMemberCardRepository = Inject(
  PoinMemberCardProviderName.PRIMARY,
);
export const InjectPoinMemberCardRepositoryOnline = Inject(
  PoinMemberCardProviderName.ONLINE,
);
