import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor() {}

  @Cron(CronExpression.EVERY_WEEK)
  run() {
    this.logger.log('run');
  }
}
