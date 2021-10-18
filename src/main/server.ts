import { Express } from 'express';
import app from './config/app';

export class Server {
  private readonly app: Express;

  constructor() {
    this.app = app;
  }

  public run(): void {
    this.app.listen(3000, () => console.log('Listen'));
  }
}
