import { IsRequiredNumber } from "src/core/decorators/dto-decorators/required-number.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class AddHadiahRequestDTO {
  @IsRequiredString({ example: "MGC" })
  kode_hadiah: string;

  @IsRequiredString({ example: "MAGIC COM" })
  nama_hadiah: string;

  @IsRequiredNumber({ example: 10 })
  poin_hadiah: number;
}
