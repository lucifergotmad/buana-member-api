import { SortBy } from "src/core/constants/app/member-report/sort-by.const";
import { StatusMember } from "src/core/constants/app/member-report/status-member.const";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class ReportDataMemberRequestDTO {
  @IsRequiredString({
    example: StatusMember.Aktif,
    description: Object.values(StatusMember).join(","),
  })
  status_member: string;

  @IsRequiredString({
    example: SortBy.Kode,
    description: Object.values(SortBy).join(", "),
  })
  sort_by: string;
}
