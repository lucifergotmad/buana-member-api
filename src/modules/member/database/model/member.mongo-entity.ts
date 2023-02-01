import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "tm_members" })
export class MemberMongoEntity extends BaseMongoEntity<
  typeof MemberMongoEntity
> {
  @Prop({ required: true, unique: true, index: 1 })
  kode_member: string;

  @Prop({ required: true, unique: true, index: 1 })
  no_identitas: string;

  @Prop({ required: true })
  tanggal_daftar: string;

  @Prop({ required: true })
  tanggal_valid: string;

  @Prop({ required: true })
  nama_lengkap: string;

  @Prop({ required: false })
  nama_depan?: string;

  @Prop({ required: false })
  nama_belakang?: string;

  @Prop({ required: true })
  tanggal_lahir: string;

  @Prop({ required: true, index: 1 })
  tempat_lahir: string;

  @Prop({ required: true })
  alamat: string;

  @Prop({ required: true })
  rt_rw: string;

  @Prop({ required: true })
  kelurahan: string;

  @Prop({ required: true })
  kota: string;

  @Prop({ required: true })
  no_hp: string;

  @Prop({ required: false })
  kode_pos?: string;

  @Prop({ required: false })
  domisili?: string;

  @Prop({ required: false, index: 1 })
  status?: string;

  @Prop({ required: false, index: 1 })
  agama?: string;

  @Prop({ required: false })
  pendidikan?: string;

  @Prop({ required: false })
  penghasilan?: string;

  @Prop({ required: false })
  pengeluaran?: string;

  @Prop({ required: false })
  jumlah_anak_pria?: number;

  @Prop({ required: false })
  jumlah_anak_wanita?: number;

  @Prop({ required: false })
  pekerjaan?: string;

  @Prop({ required: false })
  nama_perusahaan?: string;

  @Prop({ required: false })
  alamat_perusahaan?: string;

  @Prop({ required: false })
  kota_perusahaan?: string;

  @Prop({ required: false })
  bidang_usaha?: string;

  @Prop({ required: false })
  emergency_number?: string;

  @Prop({ required: false })
  jenis_kelamin: string;

  @Prop({ required: false })
  terima_sms?: boolean;

  @Prop({ required: false })
  telp_rumah?: string;

  @Prop({ required: false })
  telp_kantor?: string;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: false })
  terima_email?: boolean;

  @Prop({ required: true, default: 0 })
  poin: number;

  @Prop({ required: false })
  created_by?: string;

  @Prop({ required: false })
  created_at?: Date;

  @Prop({ required: false })
  updated_by?: string;

  @Prop({ required: false })
  updated_at?: Date;

  @Prop({ required: false })
  deleted_by?: string;

  @Prop({ required: true, default: true })
  status_active: boolean;

  @Prop({ required: false, index: 1 })
  is_online?: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(MemberMongoEntity);
export const MemberModel = [
  { name: MemberMongoEntity.name, schema: MemberSchema },
];

export type MemberDocument = MemberMongoEntity & Document;
