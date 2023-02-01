import { Injectable } from "@nestjs/common";
import { FilterQuery } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { AdjustStockHadiahResponseDTO } from "../controller/dtos/adjust-stock-hadiah.response.dto";
import { SearchAdjustStockHadiahRequestDTO } from "../controller/dtos/search-adjust-stock-hadiah.request.dto";
import { AdjustHadiahRepositoryPort } from "../database/adjust-hadiah.repository.port";
import { InjectAdjustHadiahRepository } from "../database/adjust-hadiah.repository.provider";
import { AdjustHadiahMongoEntity } from "../database/model/adjust-hadiah.mongo-entity";

@Injectable()
export class SearchAdjustStockHadiah
  extends BaseUseCase
  implements
    IUseCase<SearchAdjustStockHadiahRequestDTO, AdjustStockHadiahResponseDTO[]>
{
  constructor(
    @InjectAdjustHadiahRepository
    private readonly adjustHadiahRepository: AdjustHadiahRepositoryPort,
  ) {
    super();
  }

  async execute(
    request?: SearchAdjustStockHadiahRequestDTO,
  ): Promise<AdjustStockHadiahResponseDTO[]> {
    try {
      const result = await this.adjustHadiahRepository.findByWithNama({
        $and: [this._setOptionDate(request?.start_date, request?.end_date)],
      });

      return result.map(
        (adjustHadiah: AdjustHadiahMongoEntity) =>
          new AdjustStockHadiahResponseDTO(adjustHadiah),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }

  private _setOptionDate(
    start_date?: string,
    end_date?: string,
  ): FilterQuery<AdjustHadiahMongoEntity> {
    return start_date && end_date
      ? { tanggal: { $gte: start_date, $lte: end_date } }
      : {};
  }
}
