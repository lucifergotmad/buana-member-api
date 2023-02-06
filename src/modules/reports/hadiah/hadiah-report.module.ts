import { Module } from "@nestjs/common";
import { HadiahReportController } from "./controller/hadiah-report.controller";
import { HadiahReportUseCaseModule } from "./use-cases/hadiah-report.use-case.module";

@Module({
  imports: [HadiahReportUseCaseModule],
  controllers: [HadiahReportController],
})
export class HadiahReportModule {}
