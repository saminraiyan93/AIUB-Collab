import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = "Internal server error";
        let errors: unknown[] | undefined;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === "string") {
                message = exceptionResponse;
            } 
            else if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
                const responseBody = exceptionResponse as {
                    message?: string | string[];
                    errors?: unknown[];
                };

                message =
                    responseBody.message ??
                    "Bad request";

                if (
                    Array.isArray(responseBody.errors) &&
                    responseBody.errors.length > 0
                ) {
                    errors = responseBody.errors;
                }
            }
        }

        if (exception instanceof QueryFailedError && 
            (exception as QueryFailedError 
            & {driverError?: { code?: string };}).driverError?.code === "23505") {
                status = HttpStatus.CONFLICT;
                message = "A record with these values already exists";
                errors = undefined;
        }

        response.status(status).json({
            statusCode: status,
            message,
            ...(errors ? { errors } : {}),
            path: request.originalUrl,
            timestamp: new Date().toISOString(),
        });
    }
}