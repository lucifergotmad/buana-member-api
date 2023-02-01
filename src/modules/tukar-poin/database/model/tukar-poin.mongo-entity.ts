import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "tt_tukar_poins" })
export class TukarPoinMongoEntity extends BaseMongoEntity<
  typeof TukarPoinMongoEntity
> {
  @Prop({ required: true, unique: true, index: 1 })
  no_tukar_poin: string;

  @Prop({ required: true })
  tanggal: string;

  @Prop({ required: true, index: 1 })
  kode_member: string;

  @Prop({ required: true, index: 1 })
  kode_hadiah: string;

  @Prop({ required: true })
  jumlah: number;

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

export const TukarPoinSchema =
  SchemaFactory.createForClass(TukarPoinMongoEntity);
export const TukarPoinModel = [
  { name: TukarPoinMongoEntity.name, schema: TukarPoinSchema },
];

export type TukarPoinDocument = TukarPoinMongoEntity & Document;
