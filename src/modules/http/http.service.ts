import { Injectable } from '@nestjs/common';
import instance from 'src/common/lib/http';

import { Axios } from 'axios';

@Injectable()
export class HttpService extends Axios {
  instance = instance;
  constructor() {
    super();
    Object.assign(this, instance);
  }
}
