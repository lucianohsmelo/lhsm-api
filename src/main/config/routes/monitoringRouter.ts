import { Router } from 'express';

import { adaptRoute } from '../../adapters';

import monitoring from '../monitoring';
import { MonitoringController } from '../../controllers/MonitoringController';

const monitoringRouter = Router();

monitoringRouter.get('/metrics', adaptRoute(new MonitoringController(monitoring)));

export default monitoringRouter;
