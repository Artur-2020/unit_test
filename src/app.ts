import express, { Request, Response, Application, NextFunction } from 'express';
import { Server } from 'http';
import Router from './routes'

export default class App {
  private readonly port: number;
  app: Application;
  private server: Server | null = null;

  constructor(port: number = 3000) {
    this.port = port;
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
  }

  /**
   * Add middleware for error handling.
   *
   * @return {void} no return value
   */
  private configureMiddleware(): void {
    // Add middleware for error handling
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
     if (err) {
       console.error(err.stack);
       res.status(500).send('Something went wrong!');
     }
     next();
    });
  }

  /**
   * Configure routes.
   * @private
   */
  private configureRoutes(): void {
   this.app.use('/api', Router);
  }

  /**
   * Method for starting the server.
   */

  public async start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.server = this.app.listen(this.port, (err?: Error) => {
          if (err) {
            reject(err);
          }
          console.log(`Server is running on port ${this.port}`);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Method for stopping the server.
   */
  public async stop(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        if (this.server) {
          this.server.close((err) => {
            if (err) {
              reject(err);
            }
            console.log('Server stopped');
            resolve();
          });
        } else {
          reject(new Error('Server is not running'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
