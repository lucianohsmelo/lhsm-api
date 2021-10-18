import { Monitoring } from '@lhsm/monitoring';
import { Controller, HttpResponse, ok } from '../Models';

export class MonitoringController implements Controller {
  constructor(private readonly monitoring: Monitoring) {}

  async handle(): Promise<HttpResponse<string>> {
    return ok(await this.monitoring.register.metrics());
  }
}
