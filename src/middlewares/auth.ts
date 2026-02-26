import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../database/datasource";
import { User } from "../entities/user-model";
import { sendError } from "../shared/responseHelper";

export interface AuthRequest extends Request {
    user?: User;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendError(res, "Token no proporcionado", {}, 401);
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET!;
        const payload: any = jwt.verify(token ?? "", secret);

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id_user: payload.userId } });

        if (!user) {
            return sendError(res, "Usuario no encontrado", {}, 401);

        }

        req.user = user;
        next();
    } catch (err) {
        return sendError(res, "Token invalido", {}, 401);
    }
};