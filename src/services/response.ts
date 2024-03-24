import { ResponseDto } from "../types/response/dtos";

export class ResponseService {
  public static printResponse<T>(
    statusCode: number,
    message: string,
    body: T
  ): ResponseDto<T> {
    return {
      statusCode,
      message,
      body,
      error: false,
    };
  }
}
