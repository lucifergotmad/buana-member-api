import { Body, Param } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureDelete } from "src/core/decorators/controller-decorators/class-decorators/secure-delete.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { CreateMember } from "../use-cases/create-member.use-case";
import { DeleteMember } from "../use-cases/delete-member.use-case";
import { CreateMemberRequestDTO } from "./dtos/create-member.request.dto";

@ControllerProperty("v1/members", "[Master] Members")
export class MemberController {
  constructor(
    private readonly createMember: CreateMember,
    private readonly deleteMember: DeleteMember,
  ) {}

  @SecurePost()
  @ApiOkResponse({ type: IdResponseDTO })
  @ApiConflictResponse({ description: "Data already exists" })
  save(
    @Body() body: CreateMemberRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.createMember.injectDecodedToken(user).execute(body);
  }

  @SecureDelete(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (Data Not Found)" })
  delete(@Param() _id: string, @AuthUser() user: Partial<UserMongoEntity>) {
    return this.deleteMember.injectDecodedToken(user).execute({ _id });
  }
}
