import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  type HttpException,
} from "@nestjs/common";
import type { Response } from "express";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const ex = exception as HttpException;
    const { cause } = ex;
    const response = {
      success: false,
      error: {
        code: ex.name,
        message: ex.message,
        details: cause ? (cause as Error).message : "",
      },
      status: ex.getStatus(),
    };
    return res.status(response.status).json(response);
  }
}
