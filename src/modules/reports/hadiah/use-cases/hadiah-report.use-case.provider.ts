import { Provider } from "@nestjs/common";
import { HistoryStockHadiahReport } from "./history-stock-hadiah-report.use-case";
import { StockHadiahReport } from "./stock-hadiah-report.use-case";

export const hadiahReportUseCaseProvider: Provider[] = [
  StockHadiahReport,
  HistoryStockHadiahReport,
];
