import { ApiProperty } from "@nestjs/swagger";
import { IAdjustHadiahReportResponse } from "src/interface-adapter/interfaces/reports/adjust-hadiah/adjust-hadiah-report.response.interface";

export class AdjustHadiahReportResponseDTO
  implements IAdjustHadiahReportResponse
{
  constructor(props: IAdjustHadiahReportResponse) {
    this.kode_hadiah = props.kode_hadiah;
    this.nama_hadiah = props.nama_hadiah;
    this.stock_awal = props.stock_awal;
    this.stock_akhir = props.stock_akhir;
    this.tanggal = props.tanggal;
    this.created_by = props.created_by;
  }

  @ApiProperty({ example: "MGC" })
  kode_hadiah: string;

  @ApiProperty({ example: "MAGIC COM" })
  nama_hadiah: string;

  @ApiProperty({ example: 2 })
  stock_awal: number;

  @ApiProperty({ example: 4 })
  stock_akhir: number;

  @ApiProperty({ example: "2022-01-01" })
  tanggal: string;

  @ApiProperty({ example: "lucifergotmad" })
  created_by: string;
}
