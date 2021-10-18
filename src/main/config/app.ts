import express from 'express';
import { setupRoutes } from './routes';
import { resolve } from 'path';

const app = express();

setupRoutes(app, resolve(__dirname, 'routes'));

export default app;
