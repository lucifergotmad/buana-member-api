import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "tukar-poins" })
export class TukarPoinMongoEntity extends BaseMongoEntity<
  typeof TukarPoinMongoEntity
> {
  @Prop({ required: true, default: false })
  is_online: boolean;
}

export const TukarPoinSchema =
  SchemaFactory.createForClass(TukarPoinMongoEntity);
export const TukarPoinModel = [
  { name: TukarPoinMongoEntity.name, schema: TukarPoinSchema },
];

export type TukarPoinDocument = TukarPoinMongoEntity & Document;
