import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { IsOptionalNumber } from "src/core/decorators/dto-decorators/optional-number.decorator";
import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredMixed } from "src/core/decorators/dto-decorators/required-mixed.decorator";
import { IsRequiredNumber } from "src/core/decorators/dto-decorators/required-number.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class DetailHadiahRequestDTO {
  @IsRequiredString({ example: "MGC" })
  kode_hadiah: string;

  @IsRequiredNumber({ example: 2 })
  stock_masuk: number;

  @IsOptionalNumber({ example: 2 })
  stock_keluar: number;
}

export class AddStockHadiahRequestDTO {
  @IsRequiredMixed({
    type: DetailHadiahRequestDTO,
    example: [{ kode_hadiah: "MGC", stock_masuk: 2, stock_keluar: 2 }],
  })
  detail_hadiah: DetailHadiahRequestDTO[];
}

export class CreateStockHadiahCardRequestDTO extends AddStockHadiahRequestDTO {
  @IsRequiredString({ example: "TSH-221028-0001" })
  no_transaksi: string;

  @IsRequiredString({ example: "2022-10-28" })
  tanggal: string;

  @IsRequiredString({
    example: TipeTransaksi.TambahStockHadiah,
    description: Object.values(TipeTransaksi).join(","),
  })
  kategori: string;
}
