import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

class DetailHadiahMongoEntity {
  @Prop({ required: true })
  kode_hadiah: string;

  @Prop({ required: true })
  stock_masuk: number;
}
@Schema({ collection: "tt_tambah_hadiahs" })
export class TambahHadiahMongoEntity extends BaseMongoEntity<
  typeof TambahHadiahMongoEntity
> {
  @Prop({ required: true, unique: true, index: 1 })
  no_tambah_hadiah: string;

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

  @Prop({ required: true, default: false })
  is_online: boolean;
}

export const TambahHadiahSchema = SchemaFactory.createForClass(
  TambahHadiahMongoEntity,
);
export const TambahHadiahModel = [
  { name: TambahHadiahMongoEntity.name, schema: TambahHadiahSchema },
];

export type TambahHadiahDocument = TambahHadiahMongoEntity & Document;
