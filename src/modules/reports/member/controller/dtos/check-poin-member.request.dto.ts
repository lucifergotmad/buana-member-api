import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class CheckPoinMemberRequestDTO {
  @IsRequiredString({ example: "PLG0000001" })
  kode_member: string;
}
