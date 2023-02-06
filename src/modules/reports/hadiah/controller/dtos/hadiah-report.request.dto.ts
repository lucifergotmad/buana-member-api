import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class HadiahReportRequestDTO {
  @IsRequiredString({ example: "2022-10-09" })
  start_date: string;
}
