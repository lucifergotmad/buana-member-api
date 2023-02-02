import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class AuthRegisterRequestDTO {
  @IsRequiredString({ example: "lucifergotmad" })
  user_id: string;

  @IsRequiredString({ example: "lucifergotmad" })
  user_name: string;

  @IsRequiredString({ example: "binary1010" })
  password: string;
}
