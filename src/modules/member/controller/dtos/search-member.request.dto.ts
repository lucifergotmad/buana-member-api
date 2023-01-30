import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";

export class SearchMemberRequestDTO {
  @IsOptionalString()
  nama_member: string;

  @IsOptionalString()
  kode_member: string;

  @IsOptionalString()
  no_identitas: string;

  @IsOptionalString()
  tanggal_lahir: string;

  @IsOptionalString()
  alamat: string;

  @IsOptionalString()
  no_hp: string;
}
