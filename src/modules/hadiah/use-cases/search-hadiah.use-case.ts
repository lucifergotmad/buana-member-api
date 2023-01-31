import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { HadiahResponseDTO } from "../controller/dtos/hadiah.response.dto";
import { SearchHadiahRequestDTO } from "../controller/dtos/search-hadiah.request.dto";
import { HadiahRepositoryPort } from "../database/hadiah.repository.port";
import { InjectHadiahRepository } from "../database/hadiah.repository.provider";
import { HadiahMongoEntity } from "../database/model/hadiah.mongo-entity";

@Injectable()
export class SearchHadiah
  extends BaseUseCase
  implements IUseCase<SearchHadiahRequestDTO, HadiahResponseDTO[]>
{
  constructor(
    @InjectHadiahRepository
    private readonly hadiahRepository: HadiahRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: SearchHadiahRequestDTO,
  ): Promise<HadiahResponseDTO[]> {
    try {
      const result = await this.hadiahRepository.findBy({
        $and: [
          this._setOptionKode(request?.kode_hadiah),
          this._setOptionNama(request?.nama_hadiah),
        ],
      });

      return result.map(
        (hadiah: HadiahMongoEntity) => new HadiahResponseDTO(hadiah),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }

  private _setOptionNama(nama_hadiah: string) {
    return nama_hadiah
      ? { nama_hadiah: new RegExp(`/^(.*?(\b${nama_hadiah}\b)[^$]*)$/`) }
      : {};
  }

  private _setOptionKode(kode_hadiah: string) {
    return kode_hadiah ? { kode_hadiah } : {};
  }
}
