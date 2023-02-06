import { Module } from "@nestjs/common";
import { reportProviders } from "./report.provider";

@Module({
  providers: reportProviders,
  exports: reportProviders,
})
export class ReportModule {}
