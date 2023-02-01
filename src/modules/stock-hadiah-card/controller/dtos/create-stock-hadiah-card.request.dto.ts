import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";
import { AddStockHadiahRequestDTO } from "src/modules/tambah-hadiah/controller/dtos/add-stock-hadiah.request.dto";

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
