import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class HistoryStockHadiahRequestDTO {
  @IsRequiredString({ example: "2022-01-01" })
  start_date: string;

  @IsRequiredString({ example: "2023-01-01" })
  end_date: string;

  @IsOptionalString({ example: "MGC" })
  kode_hadiah: string;
}
