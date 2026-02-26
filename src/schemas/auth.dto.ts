import { z } from "zod";

export const registerUserSchema = z.object({
    body: z.object({
        username: z.string().min(3, "El username debe tener al menos 3 caracteres"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
        status: z.enum(["ACTIVE", "INACTIVE"]).optional()
    }),
});

export const loginUserSchema = z.object({
    body: z.object({
        username: z.string().min(1, "Username requerido"),
        password: z.string().min(1, "Password requerido"),
    }),
});

export const authResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        accessToken: z.string(),
        user: z.object({
            id_user: z.number(),
            username: z.string(),
            status: z.string()
        })
    }).optional()
});