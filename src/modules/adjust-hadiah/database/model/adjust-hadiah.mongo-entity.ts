import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

class DetailHadiahMongoEntity {
  @Prop({ required: true })
  kode_hadiah: string;

  @Prop({ required: true })
  stock_akhir: number;
}

@Schema({ collection: "tt_adjust_hadiahs" })
export class AdjustHadiahMongoEntity extends BaseMongoEntity<
  typeof AdjustHadiahMongoEntity
> {
  @Prop({ required: true, unique: true, index: 1 })
  no_adjust_hadiah: string;

  @Prop({ required: true })
  tanggal: string;

  @Prop(raw([DetailHadiahMongoEntity]))
  detail_hadiah: DetailHadiahMongoEntity[];

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

  @Prop({ required: true, default: false })
  is_online: boolean;
}

export const AdjustHadiahSchema = SchemaFactory.createForClass(
  AdjustHadiahMongoEntity,
);
export const AdjustHadiahModel = [
  { name: AdjustHadiahMongoEntity.name, schema: AdjustHadiahSchema },
];

export type AdjustHadiahDocument = AdjustHadiahMongoEntity & Document;
