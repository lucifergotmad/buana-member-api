import { ApiProperty } from "@nestjs/swagger";
import { IHadiahResponse } from "src/interface-adapter/interfaces/hadiah/hadiah.response.interface";

export class HadiahResponseDTO implements IHadiahResponse {
  constructor(props: IHadiahResponse) {
    this.kode_hadiah = props.kode_hadiah;
    this.nama_hadiah = props.nama_hadiah;
    this.poin_hadiah = props.poin_hadiah;
  }

  @ApiProperty({ example: "MGC" })
  kode_hadiah: string;

  @ApiProperty({ example: "MAGIC COM" })
  nama_hadiah: string;

  @ApiProperty({ example: 10 })
  poin_hadiah: number;
}
