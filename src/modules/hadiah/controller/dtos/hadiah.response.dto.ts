import { ApiProperty } from "@nestjs/swagger";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { IHadiahResponse } from "src/interface-adapter/interfaces/hadiah/hadiah.response.interface";

export class HadiahResponseDTO
  extends IdResponseDTO
  implements IHadiahResponse
{
  constructor(props: IHadiahResponse) {
    super(props._id);
    this.kode_hadiah = props.kode_hadiah;
    this.nama_hadiah = props.nama_hadiah;
    this.poin_hadiah = props.poin_hadiah;
    this.stock_hadiah = props.stock_hadiah;
  }

  @ApiProperty({ example: "MGC" })
  kode_hadiah: string;

  @ApiProperty({ example: "MAGIC COM" })
  nama_hadiah: string;

  @ApiProperty({ example: 10 })
  poin_hadiah: number;

  @ApiProperty({ example: 8 })
  stock_hadiah: number;
}
