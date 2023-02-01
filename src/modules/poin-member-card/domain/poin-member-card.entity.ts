import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { IHistoryUser } from "src/interface-adapter/interfaces/history-user.interface";

export interface IPoinMemberCardProps extends IHistoryUser {
  no_referensi: string;
  kode_member: string;
  kategori: string;
  poin_awal: number;
  poin_masuk: number;
  poin_keluar: number;
  poin_akhir: number;
  tanggal: string;
  is_online: boolean;
}

export class PoinMemberCardEntity extends AggregateRoot<IPoinMemberCardProps> {
  constructor(props: IPoinMemberCardProps) {
    super(props);
  }

  static create(props: IPoinMemberCardProps) {
    return new PoinMemberCardEntity(props);
  }
}
