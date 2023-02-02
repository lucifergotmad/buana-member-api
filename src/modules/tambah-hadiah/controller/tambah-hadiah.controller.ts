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
import { AddStockHadiah } from "../use-cases/add-stock-hadiah.use-case";
import { SearchAddStockHadiah } from "../use-cases/search-add-stock-hadiah.use-case";
import { AddStockHadiahRequestDTO } from "./dtos/add-stock-hadiah.request.dto";
import { AddStockHadiahResponseDTO } from "./dtos/add-stock-hadiah.response.dto";
import { SearchAddStockHadiahRequestDTO } from "./dtos/search-add-stock-hadiah.request.dto";

@ControllerProperty("v1/tambah-hadiahs", "[Transaksi] Tambah Hadiahs")
export class TambahHadiahController {
  constructor(
    private readonly addStockHadiah: AddStockHadiah,
    private readonly searchAddStockHadiah: SearchAddStockHadiah,
  ) {}

  @SecurePost()
  @ApiCreatedResponse({ type: MessageResponseDTO })
  @ApiConflictResponse({ description: "Bad Request (Data Not Found)" })
  save(
    @Body() body: AddStockHadiahRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.addStockHadiah.injectDecodedToken(user).execute(body);
  }

  @SecureGet()
  @APIQueryProperty(["start_date", "end_date"])
  @ApiOkResponse({ type: AddStockHadiahResponseDTO, isArray: true })
  find(@Query() query: SearchAddStockHadiahRequestDTO) {
    return this.searchAddStockHadiah.execute(query);
  }
}
