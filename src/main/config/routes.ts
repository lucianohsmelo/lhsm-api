import { Express, Router } from 'express';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import Logger from '@lhsm/logger';

const logger = new Logger('setupRoutes');

export const setupRoutes = (app: Express, routesDir: string): void => {
  let routes: string[] = [];
  if (routesDir && existsSync(routesDir)) {
    routes = readdirSync(routesDir, 'utf8');
  }

  routes.forEach((routerFile) => {
    if (routerFile.endsWith('Router.js') || routerFile.endsWith('Router.ts')) {
      const fullPath = join(routesDir, routerFile);
      console.log(fullPath);
      logger.debug(`Setup router "${routerFile}"`);
      console.log(fullPath);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const router = require(fullPath).default;

      app.use('/api', router);
    }
  });

  console.log(routes);
};
