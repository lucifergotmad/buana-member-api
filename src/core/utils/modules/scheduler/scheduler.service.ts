import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MigrateMember } from "src/modules/member/use-cases/migrate-member.use-case";
import { ISchedulerUtil } from "./scheduler.interface";

@Injectable()
export class SchedulerUtil implements ISchedulerUtil {
  constructor(private readonly migrateMember: MigrateMember) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async migrate(): Promise<void> {
    await this.migrateMember.execute();
  }
}
