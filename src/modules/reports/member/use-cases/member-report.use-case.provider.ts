import { Provider } from "@nestjs/common";
import { ReportDataMember } from "./report-data-member.use-case";

export const memberReportUseCaseProvider: Provider[] = [ReportDataMember];
