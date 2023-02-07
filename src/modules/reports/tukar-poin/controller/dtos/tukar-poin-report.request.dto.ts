import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class TukarPoinReportRequestDTO {
  @IsRequiredString({ example: "2022-01-01" })
  start_date: string;

  @IsRequiredString({ example: "2023-01-01" })
  end_date: string;
}
