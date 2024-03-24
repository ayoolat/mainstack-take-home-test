import env from "../config/env";
import * as firebase from "firebase-admin";
import { NextFunction, Request, Response } from "express";

export class Authenticate {
  private defaultApp: firebase.app.App;
  constructor() {
    this.accessDenied = this.accessDenied.bind(this);
    this.authenticator = this.authenticator.bind(this);

    if (!firebase.apps.length) {
      this.defaultApp = firebase.initializeApp({
        credential: firebase.credential.cert(env.firebase.firebaseConfig),
        databaseURL: "https://thecakeshop-fe7a3.firebaseio.com",
      });
    } else {
      this.defaultApp = firebase.app();
    }
  }
  public authenticator(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const token = request.headers.authorization;
    if (token && token != "") {
      this.defaultApp
        .auth()
        .verifyIdToken(token.replace("Bearer ", ""))
        .then(async (decodeToken) => {
          request.body["userId"] = decodeToken.email;
          next();
        })
        .catch((error) => {
          this.accessDenied(request.url, response);
        });
    } else {
      this.accessDenied(request.url, response);
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(401).json({
      statusCode: 401,
      timestamp: new Date().toISOString(),
      path: url,
      message: "Token invalid or expired",
    });
  }
}
