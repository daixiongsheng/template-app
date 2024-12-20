import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, _res: Response, next: NextFunction) {
    const { method, originalUrl: url, body, ip } = req;
    this.logger.log(`${method} ${url} body:${JSON.stringify(body)} ip:${ip}`);
    next();
  }
}
