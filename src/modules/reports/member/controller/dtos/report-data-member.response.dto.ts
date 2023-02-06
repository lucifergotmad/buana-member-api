import { ApiProperty } from "@nestjs/swagger";
import { MemberAgama } from "src/core/constants/app/member/agama.const";
import { IReportDataMemberResponse } from "src/interface-adapter/interfaces/reports/member/member-report.response.interface";

export class ReportDataMemberResponseDTO implements IReportDataMemberResponse {
  constructor(props: IReportDataMemberResponse) {
    this.kode_member = props.kode_member;
    this.no_identitas = props.no_identitas;
    this.nama_lengkap = props.nama_lengkap;
    this.agama = props.agama;
    this.penghasilan = props.penghasilan;
    this.pengeluaran = props.pengeluaran;
    this.jumlah_anak_pria = props.jumlah_anak_pria;
    this.jumlah_anak_wanita = props.jumlah_anak_wanita;
    this.no_hp = props.no_hp;
    this.telp_rumah = props.telp_rumah;
    this.telp_kantor = props.telp_kantor;
  }

  @ApiProperty({ example: "PLG0000001" })
  kode_member: string;

  @ApiProperty({ example: "3205352810000001" })
  no_identitas: string;

  @ApiProperty({ example: "Octyo Paswa Putra" })
  nama_lengkap: string;

  @ApiProperty({ enum: MemberAgama, example: MemberAgama.Islam })
  agama?: string;

  @ApiProperty({ example: "< 300000" })
  penghasilan?: string;

  @ApiProperty({ example: "> 100000" })
  pengeluaran?: string;

  @ApiProperty({ example: 2 })
  jumlah_anak_pria?: number;

  @ApiProperty({ example: 0 })
  jumlah_anak_wanita?: number;

  @ApiProperty({ example: "081321832034" })
  no_hp: string;

  @ApiProperty({ example: "0221477392" })
  telp_rumah?: string;

  @ApiProperty({ example: "0221477393" })
  telp_kantor?: string;
}
