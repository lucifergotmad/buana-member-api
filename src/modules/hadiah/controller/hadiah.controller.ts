import { Body, Param } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureDelete } from "src/core/decorators/controller-decorators/class-decorators/secure-delete.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { SecurePut } from "src/core/decorators/controller-decorators/class-decorators/secure-put.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { HadiahRepositoryPort } from "../database/hadiah.repository.port";
import { InjectHadiahRepository } from "../database/hadiah.repository.provider";
import { AddHadiah } from "../use-cases/add-hadiah.use-case";
import { DeleteHadiah } from "../use-cases/delete-hadiah.use-case";
import { UpdateHadiah } from "../use-cases/update-hadiah.use-case";
import { AddHadiahRequestDTO } from "./dtos/add-hadiah.request.dto";
import { UpdateHadiahRequestDTO } from "./dtos/update-hadiah.request.dto";

@ControllerProperty("v1/hadiahs", "[Master] Hadiahs")
export class HadiahController {
  constructor(
    private readonly addHadiah: AddHadiah,
    private readonly updateHadiah: UpdateHadiah,
    private readonly deleteHadiah: DeleteHadiah,
    @InjectHadiahRepository
    private readonly hadiahRepository: HadiahRepositoryPort,
  ) {}

  @SecurePost()
  @ApiOkResponse({ type: IdResponseDTO })
  @ApiConflictResponse({ description: "Data already exists!" })
  save(
    @Body() body: AddHadiahRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.addHadiah.injectDecodedToken(user).execute(body);
  }

  @SecurePut(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (Data Not Found!)" })
  update(
    @Param("_id") _id: string,
    @Body() body: UpdateHadiahRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.updateHadiah.injectDecodedToken(user).execute({ _id, ...body });
  }

  @SecureDelete(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (Data Not Found!)" })
  delete(
    @Param("_id") _id: string,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.deleteHadiah.injectDecodedToken(user).execute({ _id });
  }
}
