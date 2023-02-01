import { ApiProperty } from "@nestjs/swagger";
import { ITukarPoinResponse } from "src/interface-adapter/interfaces/tukar-poin/tukar-poin.response.interface";

export class TukarPoinResponseDTO implements ITukarPoinResponse {
  constructor(props: ITukarPoinResponse) {
    this.no_tukar_poin = props.no_tukar_poin;
    this.kode_hadiah = props.kode_hadiah;
    this.kode_member = props.kode_member;
    this.tanggal = props.tanggal;
    this.nama_hadiah = props.nama_hadiah;
    this.nama_member = props.nama_member;
    this.jumlah = props.jumlah;
  }

  @ApiProperty({ example: "TPM-231089-0001" })
  no_tukar_poin: string;

  @ApiProperty({ example: "MGC" })
  kode_hadiah: string;

  @ApiProperty({ example: "PLG0000001" })
  kode_member: string;

  @ApiProperty({ example: "2022-10-29" })
  tanggal: string;

  @ApiProperty({ example: "MAGIC COM" })
  nama_hadiah?: string;

  @ApiProperty({ example: "Octyo Paswa Putra" })
  nama_member?: string;

  @ApiProperty({ example: 2 })
  jumlah: number;
}
