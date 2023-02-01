import { Body, Query } from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { AdjustStockHadiah } from "../use-cases/adjust-stock-hadiah.use-case";
import { SearchAdjustStockHadiah } from "../use-cases/search-adjust-stock-hadiah.use-case";
import { AdjustStockHadiahRequestDTO } from "./dtos/adjust-stock-hadiah.request.dto";
import { AdjustStockHadiahResponseDTO } from "./dtos/adjust-stock-hadiah.response.dto";
import { SearchAdjustStockHadiahRequestDTO } from "./dtos/search-adjust-stock-hadiah.request.dto";

@ControllerProperty("v1/adjust-hadiahs", "[Transaksi] Adjust Hadiahs")
export class AdjustHadiahController {
  constructor(
    private readonly adjustStockHadiah: AdjustStockHadiah,
    private readonly searchAdjustStockHadiah: SearchAdjustStockHadiah,
  ) {}

  @SecurePost()
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiConflictResponse({ description: "Data already exists!" })
  save(
    @Body() body: AdjustStockHadiahRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.adjustStockHadiah.injectDecodedToken(user).execute(body);
  }

  @SecureGet()
  @APIQueryProperty(["start_date", "end_date"])
  @ApiOkResponse({ type: AdjustStockHadiahResponseDTO, isArray: true })
  find(@Query() query: SearchAdjustStockHadiahRequestDTO) {
    return this.searchAdjustStockHadiah.execute(query);
  }
}
