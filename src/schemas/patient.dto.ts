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
        estado: z.enum(['ACTIVO', 'INACTIVO']).optional(),
    
        id_tipo: z.number().int().positive(),
    }),
});

export const updatePatientSchema = z.object({
    body: z.object({
        codigo_tipo_identificacion: z.string().optional(),
        numero_identificacion: z.string().optional(),
        primer_nombre: z.string().optional(),
        segundo_nombre: z.string().optional(),
        primer_apellido: z.string().optional(),
        segundo_apellido: z.string().optional(),
        email: z.email().optional(),
        estado: z.enum(['ACTIVO', 'INACTIVO']).optional(),
    
        id_tipo: z.number().int().positive().optional(),
    }),
});

export const findPatientParams = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
});