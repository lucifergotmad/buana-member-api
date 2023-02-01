import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { IsRequiredNumber } from "src/core/decorators/dto-decorators/required-number.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class CreatePoinMemberCardRequestDTO {
  @IsRequiredString({ example: "TTT-281000-0009" })
  no_transaksi: string;

  @IsRequiredString({ example: "PLG0000001" })
  kode_member: string;

  @IsRequiredString({ example: "MGC" })
  kode_hadiah: string;

  @IsRequiredNumber({ example: 2 })
  poin_masuk: number;

  @IsRequiredNumber({ example: 2 })
  poin_keluar: number;

  @IsRequiredString({ example: "2022-10-28" })
  tanggal: string;

  @IsRequiredString({
    example: TipeTransaksi.TambahStockHadiah,
    description: Object.values(TipeTransaksi).join(","),
  })
  kategori: string;
}
