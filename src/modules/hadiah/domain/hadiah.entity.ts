import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { IHistoryUser } from "src/interface-adapter/interfaces/history-user.interface";

export interface IHadiahProps extends IHistoryUser {
  kode_hadiah: string;
  nama_hadiah: string;
  poin_hadiah: number;
  stock_hadiah: number;
  status_active: boolean;
  is_online: boolean;
}

export class HadiahEntity extends AggregateRoot<IHadiahProps> {
  constructor(props: IHadiahProps) {
    super(props);
  }

  static create(props: IHadiahProps) {
    return new HadiahEntity(props);
  }
}
