import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { HadiahResponseDTO } from "../controller/dtos/hadiah.response.dto";
import { HadiahRepositoryPort } from "../database/hadiah.repository.port";
import { InjectHadiahRepository } from "../database/hadiah.repository.provider";

@Injectable()
export class FindDetailHadiah
  extends BaseUseCase
  implements IUseCase<string, HadiahResponseDTO>
{
  constructor(
    @InjectHadiahRepository
    private readonly hadiahRepository: HadiahRepositoryPort,
  ) {
    super();
  }

  async execute(kode_hadiah?: string): Promise<HadiahResponseDTO> {
    try {
      const result = await this.hadiahRepository.findOneOrThrow(
        { kode_hadiah, status_active: true },
        "Hadiah tidak dapat ditemukan!",
      );
      return new HadiahResponseDTO(result);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
