import { ApiProperty } from "@nestjs/swagger";
import { MemberAgama } from "src/core/constants/app/member/agama.const";
import { MemberJenisKelamin } from "src/core/constants/app/member/jenis-kelamin.const";
import { MemberPendidikan } from "src/core/constants/app/member/pendidikan.const";
import { MemberStatusMenikah } from "src/core/constants/app/member/status-menikah.const";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { IMemberResponse } from "src/interface-adapter/interfaces/member/member.response.interface";

export class MemberResponseDTO
  extends IdResponseDTO
  implements IMemberResponse
{
  constructor(props: IMemberResponse) {
    super(props._id);
    this.no_hp = props.no_hp;
    this.tempat_lahir = props.tempat_lahir;
    this.pengeluaran = props.pengeluaran;
    this.tanggal_valid = props.tanggal_valid;
    this.kode_member = props.kode_member;
    this.no_identitas = props.no_identitas;
    this.tanggal_daftar = props.tanggal_daftar;
    this.nama_lengkap = props.nama_lengkap;
    this.nama_depan = props.nama_depan;
    this.nama_belakang = props.nama_belakang;
    this.tanggal_lahir = props.tanggal_lahir;
    this.alamat = props.alamat;
    this.rt_rw = props.rt_rw;
    this.kelurahan = props.kelurahan;
    this.kota = props.kota;
    this.kode_pos = props.kode_pos;
    this.domisili = props.domisili;
    this.status = props.status;
    this.agama = props.agama;
    this.poin = props.poin;
    this.pendidikan = props.pendidikan;
    this.penghasilan = props.pengeluaran;
    this.jumlah_anak_pria = props.jumlah_anak_pria;
    this.jumlah_anak_wanita = props.jumlah_anak_wanita;
    this.pekerjaan = props.pekerjaan;
    this.nama_perusahaan = props.nama_perusahaan;
    this.alamat_perusahaan = props.alamat_perusahaan;
    this.kota_perusahaan = props.kota_perusahaan;
    this.bidang_usaha = props.bidang_usaha;
    this.emergency_number = props.emergency_number;
    this.jenis_kelamin = props.jenis_kelamin;
    this.telp_rumah = props.telp_rumah;
    this.telp_kantor = props.telp_kantor;
    this.email = props.email;
  }

  @ApiProperty({ example: "PLG0000001" })
  kode_member: string;

  @ApiProperty({ example: "3205354029100000" })
  no_identitas: string;

  @ApiProperty({ example: "2022-12-23" })
  tanggal_daftar: string;

  @ApiProperty({ example: "2023-01-23" })
  tanggal_valid: string;

  @ApiProperty({ example: "Octyo Paswa Putra" })
  nama_lengkap: string;

  @ApiProperty({ example: "Octyo" })
  nama_depan?: string;

  @ApiProperty({ example: "Paswa Putra" })
  nama_belakang?: string;

  @ApiProperty({ example: "2000-10-28" })
  tanggal_lahir: string;

  @ApiProperty({ example: "Garut" })
  tempat_lahir: string;

  @ApiProperty({ example: "Jl. Pembangungan Terus" })
  alamat: string;

  @ApiProperty({ example: "001/002" })
  rt_rw: string;

  @ApiProperty({ example: "Baleendah" })
  kelurahan: string;

  @ApiProperty({ example: "Bandung" })
  kota: string;

  @ApiProperty({ example: "081321832035" })
  no_hp: string;

  @ApiProperty({ example: 0 })
  poin: number;

  @ApiProperty({ example: "403185" })
  kode_pos?: string;

  @ApiProperty({ example: "Jl. Tetap Bangun" })
  domisili?: string;

  @ApiProperty({
    enum: MemberStatusMenikah,
    example: MemberStatusMenikah.BelumMenikah,
  })
  status?: string;

  @ApiProperty({ enum: MemberAgama, example: MemberAgama.Islam })
  agama?: string;

  @ApiProperty({ enum: MemberPendidikan, example: MemberPendidikan.SarjanaS1 })
  pendidikan?: string;

  @ApiProperty({ example: "> 2000000" })
  penghasilan?: string;

  @ApiProperty({ example: "< 2000000" })
  pengeluaran?: string;

  @ApiProperty({ example: 0 })
  jumlah_anak_pria?: number;

  @ApiProperty({ example: 0 })
  jumlah_anak_wanita?: number;

  @ApiProperty({ example: "Kuli Perusahaan" })
  pekerjaan?: string;

  @ApiProperty({ example: "PT. Bangun Tidur" })
  nama_perusahaan?: string;

  @ApiProperty({ example: "Jl. Tidur Aja Ngantuk" })
  alamat_perusahaan?: string;

  @ApiProperty({ example: "Bandung" })
  kota_perusahaan?: string;

  @ApiProperty({ example: "Jasa" })
  bidang_usaha?: string;

  @ApiProperty({ example: "082214773627" })
  emergency_number?: string;

  @ApiProperty({ enum: MemberJenisKelamin, example: MemberJenisKelamin.Pria })
  jenis_kelamin: string;

  @ApiProperty({ example: "0224167261" })
  telp_rumah?: string;

  @ApiProperty({ example: "0224167263" })
  telp_kantor?: string;

  @ApiProperty({ example: "lucifergotmad@gmail.com" })
  email?: string;
}
