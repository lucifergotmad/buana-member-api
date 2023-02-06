import { ApiProperty } from "@nestjs/swagger";
import { IStockHadiahResponse } from "src/interface-adapter/interfaces/reports/hadiah/stock-hadiah-report.response.interface";

export class StockHadiahReportResponseDTO implements IStockHadiahResponse {
  constructor(props: IStockHadiahResponse) {
    this.kode_hadiah = props.kode_hadiah;
    this.nama_hadiah = props.nama_hadiah;
    this.poin = props.poin;
    this.qty = props.qty;
  }

  @ApiProperty({ example: "MGC" })
  kode_hadiah: string;

  @ApiProperty({ example: "MAGIC COM" })
  nama_hadiah: string;

  @ApiProperty({ example: 50 })
  poin: number;

  @ApiProperty({ example: 10 })
  qty: number;
}
