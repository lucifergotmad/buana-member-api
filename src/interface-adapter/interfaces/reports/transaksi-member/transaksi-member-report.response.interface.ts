export interface ITransaksiMemberReportResponse {
  tanggal: string;
  created_by: string;
  kode_member: string;
  nama_lengkap: string;
  kategori: string;
  deskripsi: string;
  jual_rp?: number;
  disc_rp?: number;
  total_jual_rp?: number;
  poin: number;
}
