import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class SearchHadiahRequestDTO {
  @IsRequiredString({ example: "MGC" })
  kode_hadiah: string;

  @IsRequiredString({ example: "MAGIC COM" })
  nama_hadiah: string;
}
