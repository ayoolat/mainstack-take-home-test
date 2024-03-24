import { ResponseDto } from "../types/response/dtos";
import { NextFunction, Request, Response } from "express";

export class ErrorHandlerMiddleware {
  public static async handle(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const errorResponse = new ResponseDto<null>();
    errorResponse.error = true;
    errorResponse.body = null;
    errorResponse.message = error.message;

    return response.status(this.getStatusCode(error)).send(errorResponse);
  }

  private static getStatusCode(error: any): number {
    let statusCode = 500;

    if (error instanceof BaseError) statusCode = 400;
    else if (error instanceof NotFound) statusCode = 404;
    return statusCode;
  }
}

abstract class BaseError extends Error {
  abstract statusCode: number;
  constructor(public message: string = "An error occurred") {
    super();
  }
}

export class NotFound extends BaseError {
  statusCode = 404;
  declare message: string;
  constructor(message: string = "Not Found") {
    super(message);
    this.message = message;
  }
}

export class Unauthorised extends BaseError {
  statusCode = 401;
  declare message: string;
  constructor(message: string = "Not Found") {
    super(message);
    this.message = message;
  }
}
