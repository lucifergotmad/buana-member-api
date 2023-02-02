import { Provider } from "@nestjs/common";
import { CreateMember } from "./create-member.use-case";
import { DeleteMember } from "./delete-member.use-case";
import { FindMemberById } from "./find-member-by-id.use-case";
import { GenerateKodeMember } from "./generate-kode-member.use-case";
import { SearchMember } from "./search-member.use-case";
import { UpdateMember } from "./update-member.use-case";

export const memberUseCaseProvider: Provider[] = [
  CreateMember,
  UpdateMember,
  DeleteMember,
  SearchMember,
  FindMemberById,
  GenerateKodeMember,
];
