import { Provider } from "@nestjs/common";
import { CreateMember } from "./create-member.use-case";

export const memberUseCaseProvider: Provider[] = [CreateMember];
