import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { StockHadiahCardMongoEntity } from "./model/stock-hadiah-card.mongo-entity";
import { StockHadiahCardEntity } from "../domain/stock-hadiah-card.entity";
import { IHadiahReportResponse } from "src/interface-adapter/interfaces/reports/hadiah/hadiah-report.response.interface";

export interface StockHadiahCardRepositoryPort
  extends BaseRepositoryPort<
    StockHadiahCardMongoEntity,
    StockHadiahCardEntity
  > {
  reportStockHadiah(tanggal: string): Promise<IHadiahReportResponse[]>;
}
