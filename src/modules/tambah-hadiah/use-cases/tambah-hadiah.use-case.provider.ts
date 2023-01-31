import { Provider } from "@nestjs/common";
import { AddStockHadiah } from "./add-stock-hadiah.use-case";
import { SearchAddStockHadiah } from "./search-add-stock-hadiah.use-case";

export const tambahHadiahUseCaseProvider: Provider[] = [
  AddStockHadiah,
  SearchAddStockHadiah,
];
