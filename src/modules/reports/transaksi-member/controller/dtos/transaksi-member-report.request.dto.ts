import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class TransaksiMemberReportRequestDTO {
  @IsOptionalString({ example: "2022-01-01" })
  start_date?: string;

  @IsOptionalString({ example: "2022-01-01" })
  end_date?: string;

  @IsOptionalString({
    example: TipeTransaksi.TukarPoin,
    description: Object.values(TipeTransaksi).join(", "),
  })
  kategori?: string;

  @IsOptionalString({ example: "PLG0000001" })
  kode_member?: string;

  @IsRequiredString({ example: "Harian", description: "Harian | History" })
  tipe: string;
}
