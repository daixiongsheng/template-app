import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('run')
  run(): string {
    this.taskService.run();
    return 'start task';
  }
}
