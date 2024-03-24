import { logger } from "../logs/logger";
import { connect, connection, Connection } from "mongoose";
import env from "../config/env"; // Update this import

export class MongoDbConnection {
  private static instanceOf: MongoDbConnection;
  private connection: Connection;

  private constructor() {
    this.connection = connection;
  }

  public static get instance(): MongoDbConnection {
    if (!this.instanceOf) {
      this.instanceOf = new MongoDbConnection();
      this.instanceOf.openConnection();
    }
    return this.instanceOf;
  }

  public async openConnection(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.subscribeToConnectionEvents();
      if (this.connection.readyState === 1) {
        resolve();
      } else {
        connect(env.database.mongodb.uri)
          .then(() => {
            resolve();
          })
          .catch((error: Error) => {
            reject(error);
          });
      }
    });
  }

  private subscribeToConnectionEvents() {
    this.connection.on("connected", () => {
      logger.debug("Mongoose connected to " + env.database.mongodb.name);
    });
    this.connection.on("error", async (error) => {
      logger.error("Mongoose connection error: " + error);
      await this.openConnection();
    });
    this.connection.on("disconnected", async () => {
      logger.warn("Mongoose disconnected");
      await this.openConnection();
    });
  }

  public async closeConnection(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection
        .close()
        .then(() => {
          resolve();
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }
}
