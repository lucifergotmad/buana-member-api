import { ApiProperty } from "@nestjs/swagger";
import { ICheckPointResponse } from "src/interface-adapter/interfaces/reports/member/check-member-report.response.interface";

export class CheckPoinMemberResponseDTO implements ICheckPointResponse {
  constructor(props: ICheckPointResponse) {
    this.nama_lengkap = props.nama_lengkap;
    this.alamat = props.alamat;
    this.poin = props.poin;
  }

  @ApiProperty({ example: "Octyo Paswa Putra" })
  nama_lengkap: string;

  @ApiProperty({ example: "Pacet, 001/002 Bandung" })
  alamat: string;

  @ApiProperty({ example: 68 })
  poin: number;
}
