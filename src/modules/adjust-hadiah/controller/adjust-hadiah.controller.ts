import { Body } from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse } from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { AdjustStockHadiah } from "../use-cases/adjust-stock-hadiah.use-case";
import { AdjustStockHadiahRequestDTO } from "./dtos/adjust-stock-hadiah.request.dto";

@ControllerProperty("v1/adjust-hadiahs", "[Transaksi] Adjust Hadiahs")
export class AdjustHadiahController {
  constructor(private readonly adjustStockHadiah: AdjustStockHadiah) {}

  @SecurePost()
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiConflictResponse({ description: "Data already exists!" })
  save(
    @Body() body: AdjustStockHadiahRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.adjustStockHadiah.injectDecodedToken(user).execute(body);
  }
}
