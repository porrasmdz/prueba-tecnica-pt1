import { Response } from "express";

export const sendSuccess = (res: Response, data: any, message = "Operación exitosa", code = 200) => {
    return res.status(code).json({
        code,
        success: true,
        message,
        data,
    });
};

export const sendError = (res: Response, message = "Ha ocurrido un error", errorData?: any, code = 500) => {
    return res.status(code).json({
        code,
        success: false,
        message,
        errorData,
    });
};