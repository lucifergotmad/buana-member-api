import { Provider } from "@nestjs/common";
import { AdjustStockHadiah } from "./adjust-stock-hadiah.use-case";
import { SearchAdjustStockHadiah } from "./search-adjust-stock-hadiah.use-case";

export const adjustHadiahUseCaseProvider: Provider[] = [
  AdjustStockHadiah,
  SearchAdjustStockHadiah,
];
