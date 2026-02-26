import { z } from "zod";

export const createPatientSchema = z.object({
    body: z.object({
        codigo_tipo_identificacion: z.string().min(1),
        numero_identificacion: z.string().min(1),
        primer_nombre: z.string().min(1),
        segundo_nombre: z.string().optional(),
        primer_apellido: z.string().min(1),
        segundo_apellido: z.string().optional(),
        email: z.email(),
        estado: z.enum(['ACTIVO', 'INACTIVO']).optional()

    }),
});

export const updatePatientSchema = z.object({
    body: z.object({

        primer_nombre: z.string().optional(),
        segundo_nombre: z.string().optional(),
        primer_apellido: z.string().optional(),
        segundo_apellido: z.string().optional(),
        email: z.email().optional(),
        estado: z.enum(['ACTIVO', 'INACTIVO']).optional()

    }),
});

export const findPatientParams = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
});

export const findPatientsQuerySchema = z.object({
    query: z.object({
        numero_identificacion: z.string().optional(),
        nombre_completo: z.string().optional(),
        email: z.string().optional(),
        estado: z.enum(['ACTIVO', 'INACTIVO']).optional(),
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().default(10),
    }),
});