import { FastifyReply } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export interface IApiErrorOptions {
  code?: string;
  details?: Record<string, any>;
  [key: string]: any;
}

export class ApiErrorResponse extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details: Record<string, any>;
  public readonly timestamp: string;
  public data: any;
  public stack?: string;

  constructor(
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = 'An unexpected error occurred',
    options: IApiErrorOptions = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = options.code || 'INTERNAL_SERVER_ERROR';
    this.details = options.details || {};
    this.timestamp = new Date().toISOString();
    this.data = options.data || null;

    // Capture stack trace, excluding constructor call from it
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }

  public toJSON() {
    return {
      status: 'error',
      statusCode: this.statusCode,
      code: this.code,
      message: this.message,
      timestamp: this.timestamp,
      ...(Object.keys(this.details).length > 0 && { details: this.details }),
      ...(this.data && { data: this.data }),
      ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
    };
  }

  public send(res: FastifyReply) {
    return res.status(this.statusCode).send(this.toJSON());
  }

  // Common error types as static methods
  static badRequest(message: string, details?: Record<string, any>) {
    return new ApiErrorResponse(StatusCodes.BAD_REQUEST, message, {
      code: 'BAD_REQUEST',
      details
    });
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiErrorResponse(StatusCodes.UNAUTHORIZED, message, {
      code: 'UNAUTHORIZED'
    });
  }

  static forbidden(message = 'Forbidden') {
    return new ApiErrorResponse(StatusCodes.FORBIDDEN, message, {
      code: 'FORBIDDEN'
    });
  }

  static notFound(message = 'Resource not found') {
    return new ApiErrorResponse(StatusCodes.NOT_FOUND, message, {
      code: 'NOT_FOUND'
    });
  }

  static conflict(message = 'Resource already exists') {
    return new ApiErrorResponse(StatusCodes.CONFLICT, message, {
      code: 'CONFLICT'
    });
  }

  static validationError(message = 'Validation failed', details: Record<string, any>) {
    return new ApiErrorResponse(StatusCodes.UNPROCESSABLE_ENTITY, message, {
      code: 'VALIDATION_ERROR',
      details
    });
  }

  static internalError(message = 'Internal server error') {
    return new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, message, {
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
}

export default ApiErrorResponse;