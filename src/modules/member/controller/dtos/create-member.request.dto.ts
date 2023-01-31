import { IsOptionalBoolean } from "src/core/decorators/dto-decorators/optional-boolean.decorator";
import { IsOptionalNumber } from "src/core/decorators/dto-decorators/optional-number.decorator";
import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class CreateMemberRequestDTO {
  @IsRequiredString({ example: "3205354029100000" })
  no_identitas: string;

  @IsRequiredString({ example: "2022-12-23" })
  tanggal_daftar: string;

  @IsRequiredString({ example: "2023-01-23" })
  tanggal_valid: string;

  @IsRequiredString({ example: "Octyo Paswa Putra" })
  nama_lengkap: string;

  @IsOptionalString({ example: "Octyo" })
  nama_depan?: string;

  @IsOptionalString({ example: "Paswa Putra" })
  nama_belakang?: string;

  @IsRequiredString({ example: "2000-10-28" })
  tanggal_lahir: string;

  @IsRequiredString({ example: "Garut" })
  tempat_lahir: string;

  @IsRequiredString({ example: "Jl. Pembangungan Terus" })
  alamat: string;

  @IsRequiredString({ example: "001/002" })
  rt_rw: string;

  @IsRequiredString({ example: "Baleendah" })
  kelurahan: string;

  @IsRequiredString({ example: "Bandung" })
  kota: string;

  @IsRequiredString({ example: "081321832035" })
  no_hp: string;

  @IsOptionalString({ example: "403185" })
  kode_pos?: string;

  @IsOptionalString({ example: "Jl. Tetap Bangun" })
  domisili?: string;

  @IsOptionalString({ example: "Belum Menikah" })
  status?: string;

  @IsOptionalString({ example: "Islam" })
  agama?: string;

  @IsOptionalString({ example: "SLTA" })
  pendidikan?: string;

  @IsOptionalString({ example: "> 2000000" })
  penghasilan?: string;

  @IsOptionalString({ example: "< 2000000" })
  pengeluaran?: string;

  @IsOptionalNumber({ example: 0 })
  jumlah_anak_pria?: number;

  @IsOptionalNumber({ example: 0 })
  jumlah_anak_wanita?: number;

  @IsOptionalString({ example: "Kuli Perusahaan" })
  pekerjaan?: string;

  @IsOptionalString({ example: "PT. Bangun Tidur" })
  nama_perusahaan?: string;

  @IsOptionalString({ example: "Jl. Tidur Aja Ngantuk" })
  alamat_perusahaan?: string;

  @IsOptionalString({ example: "Bandung" })
  kota_perusahaan?: string;

  @IsOptionalString({ example: "Jasa" })
  bidang_usaha?: string;

  @IsOptionalString({ example: "082214773627" })
  emergency_number?: string;

  @IsRequiredString({ example: "L" })
  jenis_kelamin: string;

  @IsOptionalBoolean({ example: false })
  terima_sms?: boolean;

  @IsOptionalString({ example: "0224167261" })
  telp_rumah?: string;

  @IsOptionalString({ example: "0224167263" })
  telp_kantor?: string;

  @IsOptionalString({ example: "lucifergotmad@gmail.com" })
  email?: string;

  @IsOptionalBoolean({ example: false })
  terima_email?: boolean;
}
