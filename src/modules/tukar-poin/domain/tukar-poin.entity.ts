import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { IHistoryUser } from "src/interface-adapter/interfaces/history-user.interface";

export interface ITukarPoinProps extends IHistoryUser {
  no_tukar_poin: string;
  tanggal: string;
  kode_member: string;
  kode_hadiah: string;
  jumlah: number;
  is_online: boolean;
}

export class TukarPoinEntity extends AggregateRoot<ITukarPoinProps> {
  constructor(props: ITukarPoinProps) {
    super(props);
  }

  static create(props: ITukarPoinProps) {
    return new TukarPoinEntity(props);
  }
}
