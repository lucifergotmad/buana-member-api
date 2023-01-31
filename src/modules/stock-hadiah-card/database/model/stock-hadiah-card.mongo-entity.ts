import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";
import { TipeTransaksi } from "src/core/constants/app/transaksi/tipe-transaksi.const";

@Schema({ collection: "tt_stock_hadiah_cards" })
export class StockHadiahCardMongoEntity extends BaseMongoEntity<
  typeof StockHadiahCardMongoEntity
> {
  @Prop({ required: true })
  kode_hadiah: string;

  @Prop({ required: true, default: 0 })
  stock_awal: number;

  @Prop({ required: true, default: 0 })
  stock_masuk: number;

  @Prop({ required: true, default: 0 })
  stock_keluar: number;

  @Prop({ required: true, default: 0 })
  stock_akhir: number;

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

export const StockHadiahCardSchema = SchemaFactory.createForClass(
  StockHadiahCardMongoEntity,
);
export const StockHadiahCardModel = [
  { name: StockHadiahCardMongoEntity.name, schema: StockHadiahCardSchema },
];

export type StockHadiahCardDocument = StockHadiahCardMongoEntity & Document;
