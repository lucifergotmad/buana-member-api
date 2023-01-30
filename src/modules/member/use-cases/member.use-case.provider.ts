import { Provider } from "@nestjs/common";
import { CreateMember } from "./create-member.use-case";
import { DeleteMember } from "./delete-member.use-case";

export const memberUseCaseProvider: Provider[] = [CreateMember, DeleteMember];
