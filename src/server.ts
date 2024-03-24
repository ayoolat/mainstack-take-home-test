import cors from "cors";
import v1 from "./routes/index";
import bodyParser from "body-parser";
import { logger } from "./logs/logger";
import { MongoDbConnection } from "./database/mongodb";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandler";
import express, { NextFunction, Request, Response, Router } from "express";

export class Server {
  private app;
  private mongodb: MongoDbConnection;

  constructor() {
    this.app = express();
    this.mongodb = MongoDbConnection.instance;
  }

  public start() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());

    const router = Router();
    v1(router);
    this.app.use("/api/v1", router);

    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        return ErrorHandlerMiddleware.handle(err, req, res, next);
      }
    );

    this.app.all("*", (req: Request, res: Response) => {
      res.status(404).json({
        status: false,
        error: "And Just Like That, You Completely Lost Your Way 😥",
      });
    });

    this.app;

    this.app.listen(process.env.PORT || 8082, () =>
      logger.debug(`REST at: http://localhost:${process.env.PORT || 8082}`)
    );
  }
}
