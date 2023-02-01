import { Provider } from "@nestjs/common";
import { CreateTukarPoin } from "./create-tukar-poin.use-case";

export const tukarPoinUseCaseProvider: Provider[] = [CreateTukarPoin];
