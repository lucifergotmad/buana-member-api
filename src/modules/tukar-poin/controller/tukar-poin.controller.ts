import { Body } from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse } from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { CreateTukarPoin } from "../use-cases/create-tukar-poin.use-case";
import { CreateTukarPoinRequestDTO } from "./dtos/create-tukar-poin.request.dto";

@ControllerProperty("v1/tukar-poins", "[Transaksi] Tukar Poins")
export class TukarPoinController {
  constructor(private readonly createTukarPoin: CreateTukarPoin) {}

  @SecurePost()
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiConflictResponse({ description: "Data already exists" })
  save(
    @Body() body: CreateTukarPoinRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.createTukarPoin.injectDecodedToken(user).execute(body);
  }
}
