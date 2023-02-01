import { ApiProperty } from "@nestjs/swagger";
import {
  IDetailHadiahResponse,
  IAdjustHadiahResponse,
} from "src/interface-adapter/interfaces/adjust-hadiah/adjust-hadiah.response.interface";

class DetailAddStockHadiahResponseDTO implements IDetailHadiahResponse {
  constructor(props: IDetailHadiahResponse) {
    this.kode_hadiah = props.kode_hadiah;
    this.nama_hadiah = props?.nama_hadiah;
    this.stock_akhir = props.stock_akhir;
  }

  @ApiProperty({ example: "MGC" })
  kode_hadiah: string;

  @ApiProperty({ example: "MAGIC COM" })
  nama_hadiah?: string;

  @ApiProperty({ example: 2 })
  stock_akhir: number;
}

export class AdjustStockHadiahResponseDTO implements IAdjustHadiahResponse {
  constructor(props: IAdjustHadiahResponse) {
    this.no_adjust_hadiah = props.no_adjust_hadiah;
    this.tanggal = props.tanggal;
    this.detail_hadiah = props.detail_hadiah;
  }

  @ApiProperty({ example: "TSH-229018-0001" })
  no_adjust_hadiah: string;

  @ApiProperty({ example: "2022-10-28" })
  tanggal: string;

  @ApiProperty({ type: DetailAddStockHadiahResponseDTO })
  detail_hadiah: IDetailHadiahResponse[];
}
