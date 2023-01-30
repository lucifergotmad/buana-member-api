import { Inject, Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MemberConnectionName } from "src/core/constants/app/member/conn-name.const";
import { MemberProviderName } from "src/core/constants/app/member/provider-name.const";
import { MemberMongoEntity } from "./model/member.mongo-entity";
import { MemberRepository } from "./member.repository.service";

const memberFactory = (member: Model<MemberMongoEntity>) =>
  new MemberRepository(member);

export const memberRepositoryProviders: Provider[] = [
  {
    provide: MemberProviderName.PRIMARY,
    useFactory: memberFactory,
    inject: [getModelToken(MemberConnectionName.PRIMARY)],
  },
  {
    provide: MemberProviderName.ONLINE,
    useFactory: memberFactory,
    inject: [getModelToken(MemberConnectionName.ONLINE)],
  },
];
export const InjectMemberRepository = Inject(MemberProviderName.PRIMARY);
export const InjectMemberRepository = Inject(MemberProviderName.PRIMARY);
