import { ApiProperty } from "@nestjs/swagger";
import {
  IDetailHadiahResponse,
  ITambahHadiahResponse,
} from "src/interface-adapter/interfaces/tambah-hadiah/tambah-hadiah.response.interface";

class DetailAddStockHadiahResponseDTO implements IDetailHadiahResponse {
  constructor(props: IDetailHadiahResponse) {
    this.kode_hadiah = props.kode_hadiah;
    this.nama_hadiah = props?.nama_hadiah;
    this.stock_masuk = props.stock_masuk;
  }

  @ApiProperty({ example: "MGC" })
  kode_hadiah: string;

  @ApiProperty({ example: "MAGIC COM" })
  nama_hadiah?: string;

  @ApiProperty({ example: 2 })
  stock_masuk: number;
}

export class AddStockHadiahResponseDTO implements ITambahHadiahResponse {
  constructor(props: ITambahHadiahResponse) {
    this.no_tambah_hadiah = props.no_tambah_hadiah;
    this.tanggal = props.tanggal;
    this.detail_hadiah = props.detail_hadiah;
  }

  @ApiProperty({ example: "TSH-229018-0001" })
  no_tambah_hadiah: string;

  @ApiProperty({ example: "2022-10-28" })
  tanggal: string;

  @ApiProperty({ type: DetailAddStockHadiahResponseDTO })
  detail_hadiah: IDetailHadiahResponse[];
}
