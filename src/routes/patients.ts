import { Router } from "express";
import {
    createPatientSchema,
    updatePatientSchema,
    findPatientParams,
} from "../schemas/patient.dto";
import { PatientsService } from "../services/patient-service";
import { validate } from "../middlewares/validate";

const router: Router = Router();
const service = new PatientsService();

router.get("/", async (req, res) => {
    try {
        const patients = await service.getAll();
        res.json(patients);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get(
    "/:id",
    validate(findPatientParams),
    async (req, res) => {
        try {
            const id = Number(req.params.id);
            const patient = await service.getOne(id);
            res.json(patient);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }
);

router.post(
    "/",
    validate(createPatientSchema),
    async (req, res) => {
        try {
            const created = await service.create(req.body);
            res.status(201).json(created);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
);

router.put(
    "/:id",
    validate(findPatientParams),        // valida param id
    validate(updatePatientSchema),       // valida body update
    async (req, res) => {
        try {
            const id = Number(req.params.id);
            const updated = await service.update(id, req.body);
            res.json(updated);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
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
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
);

export default router;