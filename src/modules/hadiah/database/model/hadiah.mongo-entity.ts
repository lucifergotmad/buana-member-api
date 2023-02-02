import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "tm_hadiahs" })
export class HadiahMongoEntity extends BaseMongoEntity<
  typeof HadiahMongoEntity
> {
  @Prop({ required: true, unique: true })
  kode_hadiah: string;

  @Prop({ required: true })
  nama_hadiah: string;

  @Prop({ required: true })
  poin_hadiah: number;

  @Prop({ required: true, default: 0 })
  stock_hadiah: number;

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

  @Prop({ required: true, default: false })
  is_online: boolean;
}

export const HadiahSchema = SchemaFactory.createForClass(HadiahMongoEntity);
export const HadiahModel = [
  { name: HadiahMongoEntity.name, schema: HadiahSchema },
];

export type HadiahDocument = HadiahMongoEntity & Document;
