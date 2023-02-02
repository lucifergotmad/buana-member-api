import { IId } from "../id.interface";

export interface IMemberResponse extends IId {
  kode_member: string;
  no_identitas: string;
  tanggal_daftar: string;
  tanggal_valid: string;
  nama_lengkap: string;
  tempat_lahir: string;
  alamat: string;
  tanggal_lahir: string;
  rt_rw: string;
  kelurahan: string;
  kota: string;
  no_hp: string;
  poin: number;
  nama_depan?: string;
  nama_belakang?: string;
  kode_pos?: string;
  domisili?: string;
  status?: string;
  agama?: string;
  pendidikan?: string;
  penghasilan?: string;
  pengeluaran?: string;
  jumlah_anak_pria?: number;
  jumlah_anak_wanita?: number;
  pekerjaan?: string;
  nama_perusahaan?: string;
  alamat_perusahaan?: string;
  kota_perusahaan?: string;
  bidang_usaha?: string;
  emergency_number?: string;
  jenis_kelamin: string;
  telp_rumah?: string;
  telp_kantor?: string;
  email?: string;
}
