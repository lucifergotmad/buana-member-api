import { Provider } from "@nestjs/common";
import { HadiahReport } from "./hadiah-report.use-case";

export const hadiahReportUseCaseProvider: Provider[] = [HadiahReport];
