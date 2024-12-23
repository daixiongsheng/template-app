import 'winston-daily-rotate-file';
import { transports, format } from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import { appName } from './app.config';
import { isDev, isProd } from './config/env';

export function createLogger() {
  const baseFormat = format.combine(
    format.label(),
    format.ms(),
    format.splat(),
    // 添加这个后，info中会有timestamp属性
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    utilities.format.nestLike(appName),
  );

  return WinstonModule.createLogger({
    level: 'info',
    transports: [
      isDev &&
        new transports.Console({
          format: baseFormat,
        }),
      isProd &&
        new transports.DailyRotateFile({
          format: format.combine(baseFormat, format.uncolorize()),
          level: 'info',
          dirname: 'logs',
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      isProd &&
        new transports.DailyRotateFile({
          format: format.combine(baseFormat, format.uncolorize()),
          level: 'error',
          dirname: 'logs',
          filename: '%DATE%.error.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
    ].filter(Boolean),
  });
}

export const winstonLogger = createLogger();
