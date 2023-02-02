import { IId } from "../id.interface";

export interface IHadiahResponse extends IId {
  kode_hadiah: string;
  nama_hadiah: string;
  poin_hadiah: number;
  stock_hadiah: number;
}
