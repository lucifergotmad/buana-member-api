import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { Agama } from "./value-objects/agama.value-object";
import { Email } from "./value-objects/email.value-object";
import { JenisKelamin } from "./value-objects/jenis-kelamin.value-object";
import { NomorIdentitas } from "./value-objects/nomor-identitas.value-object";
import { NomorTelepon } from "./value-objects/nomor-telepon.value-object";
import { StatusMenikah } from "./value-objects/status-menikah.value-object";
import { TeleponTetap } from "./value-objects/telepon-tetap.value-object";

interface IDetailMemberProps {
  nama_lengkap: string;
  nama_depan?: string;
  nama_belakang?: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  alamat: string;
  rt_rw: string;
  kelurahan: string;
  kota: string;
  no_hp: NomorTelepon;
  kode_pos?: string;
  domisili?: string;
  status?: StatusMenikah;
  agama?: Agama;
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
  emergency_number?: NomorTelepon;
  jenis_kelamin: JenisKelamin;
  terima_sms?: boolean;
  telp_rumah?: TeleponTetap;
  telp_kantor?: TeleponTetap;
  email?: Email;
  terima_email?: boolean;
}
export interface IMemberProps extends IDetailMemberProps {
  kode_member: string;
  no_identitas: NomorIdentitas;
  tanggal_daftar: string;
  tanggal_valid: string;
  is_online?: boolean;
}

export interface MemberFactoryProps
  extends Omit<
    IMemberProps,
    | "jenis_kelamin"
    | "email"
    | "status"
    | "no_identitas"
    | "no_hp"
    | "emergency_number"
    | "telp_rumah"
    | "telp_kantor"
    | "agama"
  > {
  no_identitas: string;
  jenis_kelamin: string;
  email: string;
  status: string;
  no_hp: string;
  emergency_number: string;
  telp_rumah: string;
  telp_kantor: string;
  agama: string;
}

export class MemberEntity extends AggregateRoot<IMemberProps> {
  constructor(props: IMemberProps) {
    super(props);
  }

  static create(props: MemberFactoryProps) {
    return new MemberEntity({
      ...props,
      jenis_kelamin: new JenisKelamin(props.jenis_kelamin),
      email: new Email(props.email),
      status: new StatusMenikah(props.status),
      no_identitas: new NomorIdentitas(props.no_identitas),
      no_hp: new NomorTelepon(props.no_hp),
      emergency_number: new NomorTelepon(props.emergency_number),
      telp_rumah: new TeleponTetap(props.telp_rumah),
      telp_kantor: new TeleponTetap(props.telp_kantor),
      agama: new Agama(props.agama),
    });
  }
}
