import { ApiProperty } from "@nestjs/swagger";
import { UserLevel } from "src/core/constants/app/user/user-level.const";
import { IAuthLoginResponse } from "src/interface-adapter/interfaces/auth-login/auth-login.response.interface";

export class AuthLoginResponseDTO implements IAuthLoginResponse {
  constructor(props: IAuthLoginResponse) {
    this.access_token = props.access_token;
    this.refresh_token = props.refresh_token;
    this.user_id = props.user_id;
    this.level = props.level;
  }
  @ApiProperty({ example: "23498sdf98234-23498ydsf-23823h-sd8f324" })
  access_token: string;

  @ApiProperty({ example: "23498sdf98234-23498ydsf-23823h-sd8f324" })
  refresh_token: string;

  @ApiProperty({ example: "lucifergotmad" })
  user_id: string;

  @ApiProperty({
    example: UserLevel.AdminMember,
    description: Object.values(UserLevel).join(","),
  })
  level: string;
}
