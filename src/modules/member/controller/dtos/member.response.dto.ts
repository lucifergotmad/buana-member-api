import { ApiProperty } from "@nestjs/swagger";
import { IMemberResponse } from "src/interface-adapter/interfaces/member/member.response.interface";

export class MemberResponseDTO implements IMemberResponse {
  constructor(props: IMemberResponse) {
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

  @ApiProperty()
  kode_member: string;

  @ApiProperty()
  no_identitas: string;

  @ApiProperty()
  tanggal_daftar: string;

  @ApiProperty()
  tanggal_valid: string;

  @ApiProperty()
  nama_lengkap: string;

  @ApiProperty()
  nama_depan?: string;

  @ApiProperty()
  nama_belakang?: string;

  @ApiProperty()
  tanggal_lahir: string;

  @ApiProperty()
  tempat_lahir: string;

  @ApiProperty()
  alamat: string;

  @ApiProperty()
  rt_rw: string;

  @ApiProperty()
  kelurahan: string;

  @ApiProperty()
  kota: string;

  @ApiProperty()
  no_hp: string;

  @ApiProperty()
  kode_pos?: string;

  @ApiProperty()
  domisili?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  agama?: string;

  @ApiProperty()
  pendidikan?: string;

  @ApiProperty()
  penghasilan?: string;

  @ApiProperty()
  pengeluaran?: string;

  @ApiProperty()
  jumlah_anak_pria?: number;

  @ApiProperty()
  jumlah_anak_wanita?: number;

  @ApiProperty()
  pekerjaan?: string;

  @ApiProperty()
  nama_perusahaan?: string;

  @ApiProperty()
  alamat_perusahaan?: string;

  @ApiProperty()
  kota_perusahaan?: string;

  @ApiProperty()
  bidang_usaha?: string;

  @ApiProperty()
  emergency_number?: string;

  @ApiProperty()
  jenis_kelamin: string;

  @ApiProperty()
  telp_rumah?: string;

  @ApiProperty()
  telp_kantor?: string;

  @ApiProperty()
  email?: string;
}
