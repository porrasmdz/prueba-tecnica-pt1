import { ZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';


export const validate =
    (schema: ZodObject) =>
        (req: Request, res: Response, next: NextFunction): void => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });

                next();
            } catch (err) {
                if (err instanceof ZodError) {
                    const errors = err.issues.map((e) => ({
                        field: e.path.join('.'),
                        error: e.message,
                    }));

                    res.status(StatusCodes.BAD_REQUEST).json(errors);
                    return;
                }

                next(err);
            }
        };