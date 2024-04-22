import express, { Request, Response, Application, NextFunction } from 'express';
import { Server } from 'http';
import Router from './routes'
import MongoDBLoader from "./db";
import * as bodyParser from "body-parser";

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
    this.app.use(bodyParser.json());
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

  public async start(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        await MongoDBLoader.connect();
        this.server = this.app.listen(this.port, (err?: Error) => {
          if (err) {
            reject(err);
          }
          resolve(`Server is running on port ${this.port}`);
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
    return new Promise<void>( (resolve, reject) => {
      try {
        if (this.server) {
          this.server.close(async (err) => {
            if (err) {
              reject(err);
            }
            await MongoDBLoader.disconnect();
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
