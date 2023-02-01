import { Provider } from "@nestjs/common";
import { CreateTukarPoin } from "./create-tukar-poin.use-case";
import { SearchTukarPoin } from "./search-tukar-poin.use-case";

export const tukarPoinUseCaseProvider: Provider[] = [
  CreateTukarPoin,
  SearchTukarPoin,
];
