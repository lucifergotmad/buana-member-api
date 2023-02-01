import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";

@Schema({ collection: "tt_poin_member_cards" })
export class PoinMemberCardMongoEntity extends BaseMongoEntity<
  typeof PoinMemberCardMongoEntity
> {
  @Prop({ required: true })
  kode_member: string;

  @Prop({ required: true, default: 0 })
  poin_awal: number;

  @Prop({ required: true, default: 0 })
  poin_masuk: number;

  @Prop({ required: true, default: 0 })
  poin_keluar: number;

  @Prop({ required: true, default: 0 })
  poin_akhir: number;

  @Prop({ required: true })
  no_referensi: string;

  @Prop({ required: true, enum: TipeTransaksi })
  kategori: string;

  @Prop({ required: false })
  created_by?: string;

  @Prop({ required: false })
  created_at?: Date;

  @Prop({ required: false })
  updated_by?: string;

  @Prop({ required: false })
  updated_at?: Date;

  @Prop({ required: true, default: false })
  is_online: boolean;
}

export const PoinMemberCardSchema = SchemaFactory.createForClass(
  PoinMemberCardMongoEntity,
);
export const PoinMemberCardModel = [
  { name: PoinMemberCardMongoEntity.name, schema: PoinMemberCardSchema },
];

export type PoinMemberCardDocument = PoinMemberCardMongoEntity & Document;
