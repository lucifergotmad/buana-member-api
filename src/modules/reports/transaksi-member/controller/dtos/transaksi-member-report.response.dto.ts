import { ApiProperty } from "@nestjs/swagger";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";
import { ITransaksiMemberReportResponse } from "src/interface-adapter/interfaces/reports/transaksi-member/transaksi-member-report.response.interface";

export class TransaksiMemberReportResponseDTO
  implements ITransaksiMemberReportResponse
{
  constructor(props: ITransaksiMemberReportResponse) {
    this.tanggal = props.tanggal;
    this.created_by = props.created_by;
    this.kode_member = props.kode_member;
    this.nama_lengkap = props.nama_lengkap;
    this.kategori = props.kategori;
    this.deskripsi = props.deskripsi;
    this.jual_rp = props.jual_rp;
    this.disc_rp = props.disc_rp;
    this.total_jual_rp = props.total_jual_rp;
    this.poin = props.poin;
  }

  @ApiProperty({ example: "2022-01-01" })
  tanggal: string;

  @ApiProperty({ example: "lucifergotmad" })
  created_by: string;

  @ApiProperty({ example: "PLG0000001" })
  kode_member: string;

  @ApiProperty({ example: "Octyo Paswa Putra" })
  nama_lengkap: string;

  @ApiProperty({ example: TipeTransaksi.TukarPoin, enum: TipeTransaksi })
  kategori: string;

  @ApiProperty({ example: "TPM-220101-0001" })
  deskripsi: string;

  @ApiProperty({ example: 20000 })
  jual_rp?: number;

  @ApiProperty({ example: 2000 })
  disc_rp?: number;

  @ApiProperty({ example: 18000 })
  total_jual_rp?: number;

  @ApiProperty({ example: 5 })
  poin: number;
}
