import { Provider } from "@nestjs/common";
import { RegisterUser } from "./register-user.use-case";
import { DeleteUser } from "./delete-user.use-case";
import { FindUserById } from "./find-user-by-id.use-case";
import { UpdateUser } from "./update-user.use-case";
import { CreateUser } from "./create-user.use-case";
import { CheckUser } from "./check-user.use-case";

export const userUseCaseProvider: Provider[] = [
  RegisterUser,
  CreateUser,
  FindUserById,
  DeleteUser,
  UpdateUser,
  CheckUser,
];
