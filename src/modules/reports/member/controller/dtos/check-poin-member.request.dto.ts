import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class CheckPoinMemberRequestDTO {
  @IsRequiredString()
  kode_member: string;
}
