import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { IHistoryUser } from "src/interface-adapter/interfaces/history-user.interface";

export interface IStockHadiahCardProps extends IHistoryUser {
  kode_hadiah: string;
  stock_awal: number;
  stock_masuk: number;
  stock_keluar: number;
  stock_akhir: number;
  no_referensi: string;
  kategori: string;
  is_online: boolean;
}

export class StockHadiahCardEntity extends AggregateRoot<IStockHadiahCardProps> {
  constructor(props: IStockHadiahCardProps) {
    super(props);
  }

  static create(props: IStockHadiahCardProps) {
    return new StockHadiahCardEntity(props);
  }
}
