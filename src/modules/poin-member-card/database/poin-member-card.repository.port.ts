import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { PoinMemberCardMongoEntity } from "./model/poin-member-card.mongo-entity";
import { PoinMemberCardEntity } from "../domain/poin-member-card.entity";
import { TukarPoinReportRequestDTO } from "src/modules/reports/tukar-poin/controller/dtos/tukar-poin-report.request.dto";
import { ITukarPoinReportResponse } from "src/interface-adapter/interfaces/reports/tukar-poin/tukar-poin-report.response.interface";

export interface PoinMemberCardRepositoryPort
  extends BaseRepositoryPort<PoinMemberCardMongoEntity, PoinMemberCardEntity> {
  reportTukarPoin(
    query: TukarPoinReportRequestDTO,
  ): Promise<ITukarPoinReportResponse[]>;
}
