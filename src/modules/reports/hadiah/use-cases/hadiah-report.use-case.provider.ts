import { Provider } from "@nestjs/common";
import { StockHadiahReport } from "./stock-hadiah-report.use-case";

export const hadiahReportUseCaseProvider: Provider[] = [StockHadiahReport];
