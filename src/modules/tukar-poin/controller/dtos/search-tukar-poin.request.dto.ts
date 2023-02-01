import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";

export class SearchTukarPoinRequestDTO {
  @IsOptionalString({ example: "2022-10-28" })
  start_date?: string;

  @IsOptionalString({ example: "2022-11-28" })
  end_date?: string;

  @IsOptionalString({ example: "MGC" })
  kode_hadiah: string;

  @IsOptionalString({ example: "PLG0000001" })
  kode_member: string;
}
