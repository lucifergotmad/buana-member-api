import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ISchedulerUtil } from "./scheduler.interface";

@Injectable()
export class SchedulerUtil implements ISchedulerUtil {
  constructor() {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async migrate(): Promise<void> {
    throw new Error("Not Implemented Yet!");
  }
}
