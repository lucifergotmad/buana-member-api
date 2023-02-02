import { Test, TestingModule } from "@nestjs/testing";
import { UtilsModule } from "src/core/utils/utils.module";
import { UserRepositoryModule } from "../database/user.repository.module";
import { CreateUser } from "../use-cases/create-user.use-case";
import { DeleteUser } from "../use-cases/delete-user.use-case";
import { FindUserById } from "../use-cases/find-user-by-id.use-case";
import { UpdateUser } from "../use-cases/update-user.use-case";
import { UserUseCaseModule } from "../use-cases/user.use-case.module";
import { UsersController } from "./users.controller";

describe("UsersController", () => {
  let controller: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepositoryModule, UtilsModule, UserUseCaseModule],
      controllers: [UsersController],
      providers: [
        CreateUser,
        DeleteUser,
        UpdateUser,
        FindUserById,
        UserUseCaseModule,
        UtilsModule,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
