import { Provider } from "@nestjs/common";
import { CheckPoinMember } from "./check-poin-member.use-case";
import { ReportDataMember } from "./report-data-member.use-case";

export const memberReportUseCaseProvider: Provider[] = [
  ReportDataMember,
  CheckPoinMember,
];
