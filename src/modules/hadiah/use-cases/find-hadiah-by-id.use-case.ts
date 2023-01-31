import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { HadiahResponseDTO } from "../controller/dtos/hadiah.response.dto";
import { HadiahRepositoryPort } from "../database/hadiah.repository.port";
import { InjectHadiahRepository } from "../database/hadiah.repository.provider";

@Injectable()
export class FindHadiahById
  extends BaseUseCase
  implements IUseCase<IId, HadiahResponseDTO>
{
  constructor(
    @InjectHadiahRepository
    private readonly hadiahRepository: HadiahRepositoryPort,
  ) {
    super();
  }

  async execute({ _id }: IId): Promise<HadiahResponseDTO> {
    try {
      const result = await this.hadiahRepository.findById(_id);

      return new HadiahResponseDTO(result);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
