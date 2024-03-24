import { logger } from "../logs/logger";
import { AuthService } from "services/auth";
import { NextFunction, Request, Response } from "express";
import validator from "../validator/validate";
import * as authValidator from "../validator/auth";
import { LoginDTO } from "types/auth/auth";
import { ResponseDto } from "types/response/dtos";

export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.login = this.login.bind(this);
  }

  public async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<ResponseDto<string>>> {
    try {
      validator(authValidator.login, request);
      logger.debug(`Start call to login for email ${request.body.email}`);
      const res = await this.authService.login(request.body as LoginDTO);

      logger.debug(`End call to login for email ${request.body.email}`);
      return response.send(res);
    } catch (err) {
      next(err);
    }
  }
}
