import { Provider } from "@nestjs/common";
import { AddStockHadiah } from "./add-stock-hadiah.use-case";

export const tambahHadiahUseCaseProvider: Provider[] = [AddStockHadiah];
