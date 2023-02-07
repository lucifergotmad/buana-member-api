import { Module } from "@nestjs/common";
import { TukarPoinReportController } from "./controller/tukar-poin-report.controller";
import { TukarPoinReportUseCaseModule } from "./use-cases/tukar-poin-report.use-case.module";

@Module({
  imports: [TukarPoinReportUseCaseModule],
  controllers: [TukarPoinReportController],
})
export class TukarPoinReportModule {}
