import { Injectable } from "@nestjs/common";
import { FilterQuery } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { AddStockHadiahResponseDTO } from "../controller/dtos/add-stock-hadiah.response.dto";
import { SearchAddStockHadiahRequestDTO } from "../controller/dtos/search-add-stock-hadiah.request.dto";
import { TambahHadiahMongoEntity } from "../database/model/tambah-hadiah.mongo-entity";
import { TambahHadiahRepositoryPort } from "../database/tambah-hadiah.repository.port";
import { InjectTambahHadiahRepository } from "../database/tambah-hadiah.repository.provider";

@Injectable()
export class SearchAddStockHadiah
  extends BaseUseCase
  implements
    IUseCase<SearchAddStockHadiahRequestDTO, AddStockHadiahResponseDTO[]>
{
  constructor(
    @InjectTambahHadiahRepository
    private readonly tambahHadiahRepository: TambahHadiahRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: SearchAddStockHadiahRequestDTO,
  ): Promise<AddStockHadiahResponseDTO[]> {
    try {
      const result = await this.tambahHadiahRepository.findByWithNama({
        $and: [this._setOptionDate(request?.start_date, request?.end_date)],
      });

      return result.map(
        (tambahHadiah: TambahHadiahMongoEntity) =>
          new AddStockHadiahResponseDTO(tambahHadiah),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }

  private _setOptionDate(
    start_date?: string,
    end_date?: string,
  ): FilterQuery<TambahHadiahMongoEntity> {
    return start_date && end_date
      ? { tanggal: { $gte: start_date, $lte: end_date } }
      : {};
  }
}
