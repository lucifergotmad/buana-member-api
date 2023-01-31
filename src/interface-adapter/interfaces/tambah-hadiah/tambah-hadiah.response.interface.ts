export interface IDetailHadiahResponse {
  kode_hadiah: string;
  nama_hadiah?: string;
  stock_masuk: number;
}

export interface ITambahHadiahResponse {
  no_tambah_hadiah: string;
  tanggal: string;
  detail_hadiah: IDetailHadiahResponse[];
}
