import { Body, Param, Query } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureDelete } from "src/core/decorators/controller-decorators/class-decorators/secure-delete.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { SecurePut } from "src/core/decorators/controller-decorators/class-decorators/secure-put.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { CreateMember } from "../use-cases/create-member.use-case";
import { DeleteMember } from "../use-cases/delete-member.use-case";
import { FindMemberById } from "../use-cases/find-member-by-id.use-case";
import { GenerateKodeMember } from "../use-cases/generate-kode-member.use-case";
import { SearchMember } from "../use-cases/search-member.use-case";
import { UpdateMember } from "../use-cases/update-member.use-case";
import { CreateMemberRequestDTO } from "./dtos/create-member.request.dto";
import { GenerateKodeMemberResponseDTO } from "./dtos/generate-kode-member.response";
import { MemberResponseDTO } from "./dtos/member.response.dto";
import { SearchMemberRequestDTO } from "./dtos/search-member.request.dto";
import { UpdateMemberRequestDTO } from "./dtos/update-member.request.dto";

@ControllerProperty("v1/members", "[Master] Members")
export class MemberController {
  constructor(
    private readonly createMember: CreateMember,
    private readonly updateMember: UpdateMember,
    private readonly deleteMember: DeleteMember,
    private readonly searchMember: SearchMember,
    private readonly findMemberById: FindMemberById,
    private readonly generateKodeMember: GenerateKodeMember,
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

  @SecureGet()
  @ApiOkResponse({ type: MemberResponseDTO, isArray: true })
  @APIQueryProperty([
    "kode_member",
    "nama_member",
    "no_identitas",
    "tanggal_lahir",
    "alamat",
    "no_hp",
  ])
  find(@Query() query?: SearchMemberRequestDTO) {
    return this.searchMember.execute(query);
  }

  @SecureGet(":_id")
  @ApiOkResponse({ type: MemberResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (Data Not Found!)" })
  findOne(@Param("_id") _id: string) {
    return this.findMemberById.execute({ _id });
  }

  @SecureGet("generate/kode-member")
  @ApiOkResponse({ type: GenerateKodeMemberResponseDTO })
  async generate() {
    return this.generateKodeMember.execute();
  }

  @SecurePut(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (Data Not Found!)" })
  update(
    @Param("_id") _id: string,
    @Body() body: UpdateMemberRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.updateMember.injectDecodedToken(user).execute({ _id, ...body });
  }

  @SecureDelete(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (Data Not Found!)" })
  delete(
    @Param("_id") _id: string,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.deleteMember.injectDecodedToken(user).execute({ _id });
  }
}
