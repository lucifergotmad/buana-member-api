import { Injectable } from "@nestjs/common";
import { FilterQuery } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { SearchTukarPoinRequestDTO } from "../controller/dtos/search-tukar-poin.request.dto";
import { TukarPoinResponseDTO } from "../controller/dtos/tukar-poin.response.dto";
import { TukarPoinMongoEntity } from "../database/model/tukar-poin.mongo-entity";
import { TukarPoinRepositoryPort } from "../database/tukar-poin.repository.port";
import { InjectTukarPoinRepository } from "../database/tukar-poin.repository.provider";

@Injectable()
export class SearchTukarPoin
  extends BaseUseCase
  implements IUseCase<SearchTukarPoinRequestDTO, TukarPoinResponseDTO[]>
{
  constructor(
    @InjectTukarPoinRepository
    private readonly tukarPoinRepository: TukarPoinRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: SearchTukarPoinRequestDTO,
  ): Promise<TukarPoinResponseDTO[]> {
    try {
      const result = await this.tukarPoinRepository.findByWithNama({
        $and: [
          this._setOptionDate(request.start_date, request.end_date),
          this._setOptionHadiah(request.kode_hadiah),
          this._setOptionMember(request.kode_member),
        ],
      });

      return result.map(
        (tukarPoin: TukarPoinMongoEntity) =>
          new TukarPoinResponseDTO(tukarPoin),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }

  private _setOptionDate(
    start_date?: string,
    end_date?: string,
  ): FilterQuery<TukarPoinMongoEntity> {
    return start_date && end_date
      ? { tanggal: { $gte: start_date, $lte: end_date } }
      : {};
  }

  private _setOptionHadiah(
    kode_hadiah?: string,
  ): FilterQuery<TukarPoinMongoEntity> {
    return kode_hadiah ? { kode_hadiah } : {};
  }

  private _setOptionMember(
    kode_member?: string,
  ): FilterQuery<TukarPoinMongoEntity> {
    return kode_member ? { kode_member } : {};
  }
}
