import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { IHistoryUser } from "src/interface-adapter/interfaces/history-user.interface";

interface IDetailHadiahProps {
  kode_hadiah: string;
  stock_akhir: number;
}

export interface IAdjustHadiahProps extends IHistoryUser {
  no_adjust_hadiah: string;
  tanggal: string;
  detail_hadiah: IDetailHadiahProps[];
  is_online: boolean;
}

export class AdjustHadiahEntity extends AggregateRoot<IAdjustHadiahProps> {
  constructor(props: IAdjustHadiahProps) {
    super(props);
  }

  static create(props: IAdjustHadiahProps) {
    return new AdjustHadiahEntity(props);
  }
}
