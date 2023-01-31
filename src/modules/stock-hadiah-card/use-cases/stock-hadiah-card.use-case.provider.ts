import { Provider } from "@nestjs/common";
import { CreateStockHadiahCard } from "./create-stock-hadiah-card.use-case";

export const stockHadiahCardUseCaseProvider: Provider[] = [
  CreateStockHadiahCard,
];
