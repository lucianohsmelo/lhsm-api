import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../Models';
import Logger from '@lhsm/logger';
import monitoring from '../config/monitoring';

const apiMetrics = monitoring.createGaugeMetric('api_metrics', 'api_metrics_help', ['method', 'url']);
const logger = new Logger('ExpressAdapter');

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<Response> => {
    apiMetrics.inc({ method: req.method, url: req.url });

    const httpRequest: HttpRequest = { params: req.params, query: req.query, body: req.body };

    logger.debug(`Receive request: ${req.originalUrl}`);

    try {
      const httpResponse = await controller.handle(httpRequest);

      res.status(httpResponse.statusCode);

      if (typeof httpResponse.data === 'string') {
        return res.send(httpResponse.data);
      }

      return res.json(httpResponse.data);
    } catch (error) {
      res.status(500);

      let errMessage = 'Internal Server Error';

      if (error instanceof Error) {
        errMessage = error.message;
        if (error.stack) {
          logger.debug(error.stack);
        }
      } else if (typeof error === 'string') {
        errMessage = error;
      }

      return res.send(errMessage);
    }
  };
};
