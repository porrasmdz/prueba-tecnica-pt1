import { Router } from "express";
import { validate } from "../middlewares/validate";
import { sendError, sendSuccess } from "../shared/responseHelper";
import { AuthService } from "../services/auth-service";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.dto";

const router: Router = Router();
const authService = new AuthService();


router.post(
    "/register",
    validate(registerUserSchema),
    async (req, res) => {
        try {
            const user = await authService.register(req.body.username, req.body.password);
            return sendSuccess(res, { id: user.id_user, username: user.username }, "Usuario registrado correctamente", 201);
        } catch (error: any) {
            return sendError(res, error.message, error, 400);
        }
    }
);

router.post(
    "/login",
    validate(loginUserSchema),
    async (req, res) => {
        try {
            const token = await authService.login(req.body.username, req.body.password);
            return sendSuccess(res, { access_token: token }, "Login exitoso", 200);
        } catch (error: any) {
            return sendError(res, error.message, error, 401);
        }
    }
);

export default router;