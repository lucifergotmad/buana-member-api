import { ApiProperty } from "@nestjs/swagger";
import { UserLevel } from "src/core/constants/app/user/user-level.const";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { IUserResponse } from "src/interface-adapter/interfaces/user/user.interface";

export class UserReponseDTO extends IdResponseDTO implements IUserResponse {
  /**
   *
   * @param props {IUserResponse}
   *
   * Transform Plain object into DTO useful for whitelisting data,
   * this will avoid data leak, and preventing return a whole bunch
   * of data to client.
   */
  constructor(props: IUserResponse) {
    super(props._id);
    this.user_id = props.user_id;
    this.user_name = props.user_name;
    this.level = props.level;
  }
  @ApiProperty({ example: "lucifer" })
  user_id: string;

  @ApiProperty({ example: "lucifer" })
  user_name: string;

  @ApiProperty({
    example: UserLevel.AdminMember,
    description: Object.values(UserLevel).join(","),
  })
  level: string;
}
