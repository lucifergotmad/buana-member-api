import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";

export class SearchHadiahRequestDTO {
  @IsOptionalString({ example: "MGC" })
  kode_hadiah: string;

  @IsOptionalString({ example: "MAGIC COM" })
  nama_hadiah: string;
}
