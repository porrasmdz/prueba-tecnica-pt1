import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../logger/logger";
import { sendError } from "./responseHelper";

export const unknownErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    logger.error(err);
    sendError(res, "Error desconocido", err, StatusCodes.INTERNAL_SERVER_ERROR)

};

export const errorHandlers: ErrorRequestHandler[] = [
    unknownErrorHandler,
];