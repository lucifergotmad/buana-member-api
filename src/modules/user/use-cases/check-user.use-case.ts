import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserRepositoryPort } from "../database/user.repository.port";
import { InjectUserRepository } from "../database/user.repository.provider";

@Injectable()
export class CheckUser
  extends BaseUseCase
  implements IUseCase<string, MessageResponseDTO>
{
  constructor(
    @InjectUserRepository private userRepository: UserRepositoryPort,
  ) {
    super();
  }

  public async execute(user_id: string): Promise<MessageResponseDTO> {
    try {
      await this.userRepository.findOneAndThrow(
        { user_id },
        "User Id telah digunakan!",
      );

      return new MessageResponseDTO("User Id tersedia");
    } catch (err) {
      throw new ResponseException(err.message, err.status, err.trace);
    }
  }
}
