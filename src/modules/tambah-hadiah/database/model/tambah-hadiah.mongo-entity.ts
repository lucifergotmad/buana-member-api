import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "tt_tambah_hadiahs" })
export class TambahHadiahMongoEntity extends BaseMongoEntity<
  typeof TambahHadiahMongoEntity
> {
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
