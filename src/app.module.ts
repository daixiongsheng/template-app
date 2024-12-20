import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './modules/task/task.module';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './app.logger';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { MainModule } from './modules/main/main.module';

@Module({
  imports: [
    MainModule,
    TaskModule,
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      instance: winstonLogger as any,
    }),
  ],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
