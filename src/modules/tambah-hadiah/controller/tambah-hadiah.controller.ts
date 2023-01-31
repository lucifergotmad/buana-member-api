import { Body } from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse } from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { AddStockHadiah } from "../use-cases/add-stock-hadiah.use-case";
import { AddStockHadiahRequestDTO } from "./dtos/add-stock-hadiah.request.dto";

@ControllerProperty("v1/tambah-hadiahs", "[Transaksi] Tambah Hadiahs")
export class TambahHadiahController {
  constructor(private readonly addStockHadiah: AddStockHadiah) {}

  @SecurePost()
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiConflictResponse({ description: "Bad Request (Data Not Found)" })
  save(
    @Body() body: AddStockHadiahRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.addStockHadiah.injectDecodedToken(user).execute(body);
  }
}
