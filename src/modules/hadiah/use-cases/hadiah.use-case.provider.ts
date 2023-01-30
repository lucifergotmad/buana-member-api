import { Provider } from "@nestjs/common";
import { AddHadiah } from "./add-hadiah.use-case";
import { DeleteHadiah } from "./delete-hadiah.use-case";
import { UpdateHadiah } from "./update-hadiah.use-case";

export const hadiahUseCaseProvider: Provider[] = [
  AddHadiah,
  UpdateHadiah,
  DeleteHadiah,
];
