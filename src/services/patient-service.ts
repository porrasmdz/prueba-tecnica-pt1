import { DataSource } from "typeorm";
import { Patient } from "../entities/patient-model";
import AppDataSource from "../database/datasource";
import { IdentificationType } from "../entities/identification-type-model";
import { status } from "../config/constants";

export class PatientsService {
    private repo = AppDataSource.getRepository(Patient);
    private typeRepo = AppDataSource.getRepository(IdentificationType);

    async getAll() {
        const patients = await this.repo.find({
            relations: ["tipoIdentificacion"],
        });
        return patients;
    }

    async getOne(id: number) {
        const patient = await this.repo.findOne({
            where: { id_paciente: id },
            relations: ["tipoIdentificacion"],
        });
        if (!patient) {
            throw new Error(`Patient with id ${id} not found`);
        }
        return patient;
    }

    async create(data: Partial<Patient>) {
        const type = await this.typeRepo.findOne({
            where: { id_tipo: data.id_tipo! },
        });
        if (!type) {
            throw new Error(`Identification type with id ${data.id_tipo} not found`);
        }

        const newPatient = this.repo.create(data);
        if (!data.estado) {
            newPatient.estado = status.active
        }

        const fullNameTokens = [newPatient.primer_nombre, newPatient.segundo_nombre, newPatient.primer_apellido, newPatient.segundo_apellido];
        const fullName = fullNameTokens.filter(str => str !== undefined && str !== null).join(" ")
        newPatient.nombre_completo = fullName

        newPatient.fecha_ingreso = new Date()
        newPatient.usuario_ingreso = 'admin'
        return this.repo.save(newPatient);
    }

    async update(id: number, data: Partial<Patient>) {
        const patient = await this.getOne(id);

        if (data.id_tipo !== undefined) {
            const type = await this.typeRepo.findOne({
                where: { id_tipo: data.id_tipo },
            });
            if (!type) {
                throw new Error(`Identification type with id ${data.id_tipo} not found`);
            }
        }
        this.repo.merge(patient, data);
        const fullNameTokens = [patient.primer_nombre, patient.segundo_nombre, patient.primer_apellido, patient.segundo_apellido];
        const fullName = fullNameTokens.filter(str => str !== undefined && str !== null).join(" ")
        patient.nombre_completo = fullName

        patient.fecha_modificacion = new Date()
        patient.usuario_modificacion = 'admin'

        return this.repo.save(patient);
    }

    async delete(id: number) {
        const patient = await this.getOne(id);
        await this.repo.remove(patient);
        return { deleted: true };
    }
}