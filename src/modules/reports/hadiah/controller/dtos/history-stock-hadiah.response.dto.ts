import { ApiProperty } from "@nestjs/swagger";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { IHistoryStockHadiahResponse } from "src/interface-adapter/interfaces/reports/hadiah/history-stock-hadiah.response.interface";

export class HistoryStockHadiahResponseDTO
  implements IHistoryStockHadiahResponse
{
  constructor(props: IHistoryStockHadiahResponse) {
    this.tanggal = props.tanggal;
    this.no_transaksi = props.no_transaksi;
    this.jenis_transaksi = props.jenis_transaksi;
    this.kode_hadiah = props.kode_hadiah;
    this.nama_hadiah = props.nama_hadiah;
    this.kode_member = props.kode_member;
    this.qty = props.qty;
  }

  @ApiProperty({ example: "2022-01-01" })
  tanggal: string;

  @ApiProperty({ example: "TPM-220101-0001" })
  no_transaksi: string;

  @ApiProperty({ enum: TipeTransaksi, example: TipeTransaksi.TukarPoin })
  jenis_transaksi: string;

  @ApiProperty({ example: "MGC" })
  kode_hadiah: string;

  @ApiProperty({ example: "MAGIC COM" })
  nama_hadiah: string;

  @ApiProperty({ example: "PLG0000001" })
  kode_member: string;

  @ApiProperty({ example: 10 })
  qty: number;
}
