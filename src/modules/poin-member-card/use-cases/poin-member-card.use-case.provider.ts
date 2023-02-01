import { Provider } from "@nestjs/common";
import { CreatePoinMemberCard } from "./create-poin-member-card.use-case";

export const poinMemberCardUseCaseProvider: Provider[] = [CreatePoinMemberCard];
