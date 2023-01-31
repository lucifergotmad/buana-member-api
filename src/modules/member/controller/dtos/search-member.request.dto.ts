import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";

export class SearchMemberRequestDTO {
  @IsOptionalString({ example: "Octyo Paswa Putra" })
  nama_member: string;

  @IsOptionalString({ example: "PLG0000001" })
  kode_member: string;

  @IsOptionalString({ example: "3205354029100000" })
  no_identitas: string;

  @IsOptionalString({ example: "2000-10-28" })
  tanggal_lahir: string;

  @IsOptionalString({ example: "Jl. Tetap Bangun" })
  alamat: string;

  @IsOptionalString({ example: "08223178889" })
  no_hp: string;
}
