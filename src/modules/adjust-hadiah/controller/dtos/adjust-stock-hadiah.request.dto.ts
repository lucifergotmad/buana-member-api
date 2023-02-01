import { IsRequiredMixed } from "src/core/decorators/dto-decorators/required-mixed.decorator";
import { IsRequiredNumber } from "src/core/decorators/dto-decorators/required-number.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class DetailHadiahRequestDTO {
  @IsRequiredString({ example: "MGC" })
  kode_hadiah: string;

  @IsRequiredNumber({ example: 8 })
  stock_akhir: number;
}

export class AdjustStockHadiahRequestDTO {
  @IsRequiredMixed({
    type: DetailHadiahRequestDTO,
    example: [{ kode_hadiah: "MGC", stock_akhir: 8 }],
  })
  detail_hadiah: DetailHadiahRequestDTO[];
}
