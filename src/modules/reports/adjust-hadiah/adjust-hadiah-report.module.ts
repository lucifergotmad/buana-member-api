import { Module } from "@nestjs/common";
import { AdjustHadiahReportController } from "./controller/adjust-hadiah-report.controller";
import { AdjustHadiahReportUseCaseModule } from "./use-cases/adjust-hadiah-report.use-case.module";

@Module({
  imports: [AdjustHadiahReportUseCaseModule],
  controllers: [AdjustHadiahReportController],
})
export class AdjustHadiahReportModule {}
