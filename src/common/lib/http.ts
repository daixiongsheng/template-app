import { Logger } from '@nestjs/common';
import axios from 'axios';
import { isNumber } from 'lodash';
import { maxBodyLength } from 'src/config/http';

const maxRetries = 10;
const retryDelay = 10000;
const instance = axios.create();

const logger = new Logger('http');

instance.defaults.maxBodyLength = maxBodyLength;

instance.interceptors.request.use(
  (config) => {
    if (!isNumber((config as any).retries)) {
      (config as any).retries = 0;
    }
    return config;
  },
  undefined,
  { synchronous: true },
);

instance.interceptors.response.use(
  (response) => {
    // 如果响应成功，直接返回响应
    return response.data;
  },
  (error) => {
    const config = error.config;
    const isLimited = error.response.status === 429;
    const rateLimitReset = Number.parseInt(
      error.response?.headers['x-ogw-ratelimit-reset'],
    );
    const timeDelay =
      isNumber(rateLimitReset) && !Number.isNaN(rateLimitReset)
        ? rateLimitReset * 1000
        : retryDelay;
    // 判断是否配置了重试并且重试次数小于最大重试次数
    if (config && isNumber(config.retries) && config.retries < maxRetries) {
      const delay = Math.min(timeDelay, retryDelay);
      config.retries++;
      logger.log(
        `isLimited: ${isLimited}, ${config.method} ${config.url}, retry after ${delay}ms, retry count: ${config.retries}`,
      );
      logger.error(error);
      // 返回一个新的Promise，在延迟一段时间后重新发送请求
      return new Promise((resolve) => {
        setTimeout(() => {
          instance(config).then(resolve).catch(resolve);
        }, delay);
      });
    }
    // 如果重试次数超过最大值或者没有配置重试，就返回错误
    return Promise.reject(error);
  },
);

export default instance;
