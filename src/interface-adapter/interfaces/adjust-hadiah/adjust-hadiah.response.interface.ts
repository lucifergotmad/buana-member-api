export interface IDetailHadiahResponse {
  kode_hadiah: string;
  nama_hadiah?: string;
  stock_akhir: number;
}

export interface IAdjustHadiahResponse {
  no_adjust_hadiah: string;
  tanggal: string;
  detail_hadiah: IDetailHadiahResponse[];
}
