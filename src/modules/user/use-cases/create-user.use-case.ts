import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { CreateUserRequestDTO } from "../controller/dtos/create-user.request.dto";
import { UserRepositoryPort } from "../database/user.repository.port";
import { InjectUserRepository } from "../database/user.repository.provider";
import { UserEntity } from "../domain/user.entity";

@Injectable()
export class CreateUser
  extends BaseUseCase
  implements IUseCase<CreateUserRequestDTO, IdResponseDTO>
{
  constructor(
    @InjectUserRepository private readonly userRepository: UserRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute(request?: CreateUserRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      let result: IRepositoryResponse;
      await session.withTransaction(async () => {
        const userEntity = await UserEntity.create({
          username: request.username,
          password: request.password,
          level: request.level,
        });

        result = await this.userRepository.save(userEntity, session);
      });

      return new IdResponseDTO(result._id);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
