import { OmitType } from "@nestjs/swagger";
import { CreateMemberRequestDTO } from "./create-member.request.dto";

export class UpdateMemberRequestDTO extends OmitType(
  CreateMemberRequestDTO,
  [],
) {}
