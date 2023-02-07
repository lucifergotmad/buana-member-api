import { Provider } from "@nestjs/common";
import { AdjustHadiahReport } from "./adjust-hadiah-report.use-case";

export const adjustHadiahReportUseCaseProvider: Provider[] = [
  AdjustHadiahReport,
];
