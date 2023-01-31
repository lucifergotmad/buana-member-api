import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { IHistoryUser } from "src/interface-adapter/interfaces/history-user.interface";

export interface IDetailHadiahProps {
  kode_hadiah: string;
  stock_masuk: number;
}

export interface ITambahHadiahProps extends IHistoryUser {
  no_tambah_hadiah: string;
  tanggal: string;
  detail_hadiah: IDetailHadiahProps[];
  is_online: boolean;
}

export class TambahHadiahEntity extends AggregateRoot<ITambahHadiahProps> {
  constructor(props: ITambahHadiahProps) {
    super(props);
  }

  static create(props: ITambahHadiahProps) {
    return new TambahHadiahEntity(props);
  }
}
