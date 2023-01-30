import { IsOptionalBoolean } from "src/core/decorators/dto-decorators/optional-boolean.decorator";
import { IsOptionalNumber } from "src/core/decorators/dto-decorators/optional-number.decorator";
import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class CreateMemberRequestDTO {
  @IsRequiredString()
  no_identitas: string;

  @IsRequiredString()
  tanggal_daftar: string;

  @IsRequiredString()
  tanggal_valid: string;

  @IsRequiredString()
  nama_lengkap: string;

  @IsOptionalString()
  nama_depan?: string;

  @IsOptionalString()
  nama_belakang?: string;

  @IsRequiredString()
  tanggal_lahir: string;

  @IsRequiredString()
  tempat_lahir: string;

  @IsRequiredString()
  alamat: string;

  @IsRequiredString()
  rt_rw: string;

  @IsRequiredString()
  kelurahan: string;

  @IsRequiredString()
  kota: string;

  @IsRequiredString()
  no_hp: string;

  @IsOptionalString()
  kode_pos?: string;

  @IsOptionalString()
  domisili?: string;

  @IsOptionalString()
  status?: string;

  @IsOptionalString()
  agama?: string;

  @IsOptionalString()
  pendidikan?: string;

  @IsOptionalString()
  penghasilan?: string;

  @IsOptionalString()
  pengeluaran?: string;

  @IsOptionalNumber()
  jumlah_anak_pria?: number;

  @IsOptionalNumber()
  jumlah_anak_wanita?: number;

  @IsOptionalString()
  pekerjaan?: string;

  @IsOptionalString()
  nama_perusahaan?: string;

  @IsOptionalString()
  alamat_perusahaan?: string;

  @IsOptionalString()
  kota_perusahaan?: string;

  @IsOptionalString()
  bidang_usaha?: string;

  @IsOptionalString()
  emergency_number?: string;

  @IsRequiredString()
  jenis_kelamin: string;

  @IsOptionalBoolean()
  terima_sms?: boolean;

  @IsOptionalString()
  telp_rumah?: string;

  @IsOptionalString()
  telp_kantor?: string;

  @IsOptionalString()
  email?: string;

  @IsOptionalBoolean()
  terima_email?: boolean;
}
