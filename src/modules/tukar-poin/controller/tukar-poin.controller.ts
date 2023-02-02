import { Body, Query } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { CreateTukarPoin } from "../use-cases/create-tukar-poin.use-case";
import { SearchTukarPoin } from "../use-cases/search-tukar-poin.use-case";
import { CreateTukarPoinRequestDTO } from "./dtos/create-tukar-poin.request.dto";
import { SearchTukarPoinRequestDTO } from "./dtos/search-tukar-poin.request.dto";
import { TukarPoinResponseDTO } from "./dtos/tukar-poin.response.dto";

@ControllerProperty("v1/tukar-poins", "[Transaksi] Tukar Poins")
export class TukarPoinController {
  constructor(
    private readonly createTukarPoin: CreateTukarPoin,
    private readonly searchTukarPoin: SearchTukarPoin,
  ) {}

  @SecurePost()
  @ApiCreatedResponse({ type: MessageResponseDTO })
  @ApiConflictResponse({ description: "Data already exists" })
  save(
    @Body() body: CreateTukarPoinRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.createTukarPoin.injectDecodedToken(user).execute(body);
  }

  @SecureGet()
  @APIQueryProperty(["start_date", "end_date", "kode_hadiah", "kode_member"])
  @ApiOkResponse({ type: TukarPoinResponseDTO, isArray: true })
  find(@Query() query: SearchTukarPoinRequestDTO) {
    return this.searchTukarPoin.execute(query);
  }
}
