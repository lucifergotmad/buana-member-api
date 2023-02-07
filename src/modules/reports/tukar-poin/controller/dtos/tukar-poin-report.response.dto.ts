import { ApiProperty } from "@nestjs/swagger";
import { ITukarPoinReportResponse } from "src/interface-adapter/interfaces/reports/tukar-poin/tukar-poin-report.response.interface";

export class TukarPoinReportResponseDTO implements ITukarPoinReportResponse {
  constructor(props: ITukarPoinReportResponse) {
    this.tanggal = props.tanggal;
    this.kode_member = props.kode_member;
    this.nama_lengkap = props.nama_lengkap;
    this.nama_hadiah = props.nama_hadiah;
    this.poin_awal = props.poin_awal;
    this.poin_tukar = props.poin_tukar;
    this.poin_akhir = props.poin_akhir;
  }

  @ApiProperty({ example: "2022-01-01" })
  tanggal: string;

  @ApiProperty({ example: "PLG0000001" })
  kode_member: string;

  @ApiProperty({ example: "Octyo paswa Putra" })
  nama_lengkap: string;

  @ApiProperty({ example: "MAGIC COM" })
  nama_hadiah: string;

  @ApiProperty({ example: 30 })
  poin_awal: number;

  @ApiProperty({ example: 10 })
  poin_tukar: number;

  @ApiProperty({ example: 20 })
  poin_akhir: number;
}
