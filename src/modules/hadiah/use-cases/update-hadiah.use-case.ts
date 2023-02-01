import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { UpdateHadiahRequestDTO } from "../controller/dtos/update-hadiah.request.dto";
import { HadiahRepositoryPort } from "../database/hadiah.repository.port";
import { InjectHadiahRepository } from "../database/hadiah.repository.provider";
import { HadiahMongoEntity } from "../database/model/hadiah.mongo-entity";

@Injectable()
export class UpdateHadiah
  extends BaseUseCase
  implements IUseCase<IId & UpdateHadiahRequestDTO, MessageResponseDTO>
{
  constructor(
    @InjectHadiahRepository
    private readonly hadiahRepository: HadiahRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute({
    _id,
    ...request
  }: IId & UpdateHadiahRequestDTO): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      let result: IRepositoryResponse;

      await session.withTransaction(async () => {
        const payload: Partial<HadiahMongoEntity> = request;
        result = await this.hadiahRepository.update(
          { _id, status_active: true },
          { ...payload, updated_by: this?.user?.username },
          session,
        );
      });

      return new MessageResponseDTO(`${result.n} documents updated!`);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
