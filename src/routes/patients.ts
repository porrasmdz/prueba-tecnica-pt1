import { Router } from "express";
import {
    createPatientSchema,
    updatePatientSchema,
    findPatientParams,
    findPatientsQuerySchema,
} from "../schemas/patient.dto";
import { PatientsService } from "../services/patient-service";
import { validate } from "../middlewares/validate";
import { sendError, sendSuccess } from "../shared/responseHelper";

const router: Router = Router();
const service = new PatientsService();

router.get("/", async (req, res) => {
    try {
        const parsed = findPatientsQuerySchema.parse({ query: req.query });

        const result = await service.getAll(parsed.query);
        return sendSuccess(res, result, "Pacientes obtenidos correctamente");
    } catch (error: any) {
        // res.status(500).json({ message: error.message });
        return sendError(res, error.message, error.stack, 500)
    }
});

router.get(
    "/:id",
    validate(findPatientParams),
    async (req, res) => {
        try {
            const id = Number(req.params.id);
            const patient = await service.getOne(id);
            return sendSuccess(res, patient, "Paciente obtenido correctamente");
        } catch (error: any) {
            return sendError(res, error.message, error, 404)
        }
    }
);

router.post(
    "/",
    validate(createPatientSchema),
    async (req, res) => {
        try {
            const created = await service.create(req.body);

            return sendSuccess(res, created, "Paciente creado correctamente", 201);
        } catch (error: any) {

            return sendError(res, error.message, error, 400)
        }
    }
);

router.put(
    "/:id",
    validate(findPatientParams),
    validate(updatePatientSchema),
    async (req, res) => {
        try {
            const id = Number(req.params.id);
            const updated = await service.update(id, req.body);

            return sendSuccess(res, updated, "Paciente actualizado correctamente");
        } catch (error: any) {

            return sendError(res, error.message, error, 400)
        }
    }
);

router.delete(
    "/:id",
    validate(findPatientParams),
    async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await service.delete(id);
            return sendSuccess(res, result, "Paciente eliminado correctamente");
        } catch (error: any) {

            return sendError(res, error.message, error, 400)
        }
    }
);

export default router;