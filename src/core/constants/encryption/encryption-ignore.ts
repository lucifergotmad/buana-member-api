export const UserIgnore = ["_id", "password", "level", "user_id"];

export const MemberIgnore = [
  "_id",
  "kode_member",
  "tanggal_daftar",
  "tanggal_valid",
  "tanggal_lahir",
];

export const HadiahIgnore = ["_id", "kode_hadiah"];

export const TambahHadiahIgnore = [
  "_id",
  "no_tambah_hadiah",
  "tanggal",
  "kode_hadiah",
];

export const AdjustHadiahIgnore = [
  "_id",
  "no_adjust_hadiah",
  "tanggal",
  "kode_hadiah",
];

export const TukarPoinIgnore = ["_id", "kode_member", "kode_hadiah", "tanggal"];

export const PoinMemberCardIgnore = [
  "_id",
  "no_referensi",
  "kode_member",
  "tanggal",
];

export const StockHadiahCardIgnore = [
  "_id",
  "no_referensi",
  "kode_hadiah",
  "tanggal",
  "kategori",
];
