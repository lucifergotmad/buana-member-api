import { ApiProperty } from "@nestjs/swagger";
import { IGenerateKodeMemberResponse } from "src/interface-adapter/interfaces/member/generate-kode-member.response.interface";

export class GenerateKodeMemberResponseDTO
  implements IGenerateKodeMemberResponse
{
  constructor(props: IGenerateKodeMemberResponse) {
    this.kode_member = props.kode_member;
  }

  @ApiProperty({ example: "PLG0000001" })
  kode_member: string;
}
