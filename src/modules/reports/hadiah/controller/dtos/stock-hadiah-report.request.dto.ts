import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class StockHadiahReportRequestDTO {
  @IsRequiredString({ example: "2022-10-09" })
  start_date: string;
}
