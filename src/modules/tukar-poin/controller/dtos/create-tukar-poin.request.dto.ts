import { IsRequiredNumber } from "src/core/decorators/dto-decorators/required-number.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class CreateTukarPoinRequestDTO {
  @IsRequiredString({ example: "PLG0000001" })
  kode_member: string;

  @IsRequiredString({ example: "MGC" })
  kode_hadiah: string;

  @IsRequiredNumber({ example: 2 })
  jumlah: number;
}
