import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm/';
import { Response } from 'express';

export class DuplicatedEntryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(409).json({
      message: {
        statusCode: 409,
        error: 'Already exists',
        message: exception.message,
      },
    });
  }
}
