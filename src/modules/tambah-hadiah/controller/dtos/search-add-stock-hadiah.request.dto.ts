import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";

export class SearchAddStockHadiahRequestDTO {
  @IsOptionalString({ example: "2022-10-28" })
  start_date?: string;

  @IsOptionalString({ example: "2022-11-28" })
  end_date?: string;
}
