import { Provider } from "@nestjs/common";
import { AddHadiah } from "./add-hadiah.use-case";
import { DeleteHadiah } from "./delete-hadiah.use-case";
import { FindDetailHadiah } from "./find-detail-hadiah.use-case";
import { FindHadiahById } from "./find-hadiah-by-id.use-case";
import { SearchHadiah } from "./search-hadiah.use-case";
import { UpdateHadiah } from "./update-hadiah.use-case";

export const hadiahUseCaseProvider: Provider[] = [
  AddHadiah,
  UpdateHadiah,
  DeleteHadiah,
  FindHadiahById,
  SearchHadiah,
  FindDetailHadiah,
];
