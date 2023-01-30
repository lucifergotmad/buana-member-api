import { Body } from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse } from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { CreateMember } from "../use-cases/create-member.use-case";
import { CreateMemberRequestDTO } from "./dtos/create-member.request.dto";

@ControllerProperty("v1/members", "[Master] Members")
export class MemberController {
  constructor(private readonly createMember: CreateMember) {}

  @SecurePost()
  @ApiOkResponse({ type: IdResponseDTO })
  @ApiConflictResponse({ description: "Data already exists" })
  save(@Body() body: CreateMemberRequestDTO) {
    return this.createMember.execute(body);
  }
}
