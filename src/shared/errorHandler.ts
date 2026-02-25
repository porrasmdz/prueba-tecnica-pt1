import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../logger/logger";

export const unknownErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    logger.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
    });
};

export const errorHandlers: ErrorRequestHandler[] = [
    unknownErrorHandler,
];