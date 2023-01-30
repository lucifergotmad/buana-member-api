import { Provider } from "@nestjs/common";
import { CreateMember } from "./create-member.use-case";
import { DeleteMember } from "./delete-member.use-case";
import { FindMemberById } from "./find-member-by-id.use-case";
import { SearchMember } from "./search-member.use-case";

export const memberUseCaseProvider: Provider[] = [
  CreateMember,
  DeleteMember,
  SearchMember,
  FindMemberById,
];
