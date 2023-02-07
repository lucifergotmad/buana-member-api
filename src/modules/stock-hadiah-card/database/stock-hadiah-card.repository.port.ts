import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { StockHadiahCardMongoEntity } from "./model/stock-hadiah-card.mongo-entity";
import { StockHadiahCardEntity } from "../domain/stock-hadiah-card.entity";
import { IStockHadiahResponse } from "src/interface-adapter/interfaces/reports/hadiah/stock-hadiah-report.response.interface";
import { HistoryStockHadiahRequestDTO } from "src/modules/reports/hadiah/controller/dtos/history-stock-hadiah.request.dto";
import { IHistoryStockHadiahResponse } from "src/interface-adapter/interfaces/reports/hadiah/history-stock-hadiah.response.interface";

export interface StockHadiahCardRepositoryPort
  extends BaseRepositoryPort<
    StockHadiahCardMongoEntity,
    StockHadiahCardEntity
  > {
  reportStockHadiah(tanggal: string): Promise<IStockHadiahResponse[]>;
  reportHistoryStockHadiah(
    query: HistoryStockHadiahRequestDTO,
  ): Promise<IHistoryStockHadiahResponse[]>;
}
