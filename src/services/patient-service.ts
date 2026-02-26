import { DataSource } from "typeorm";
import { Patient } from "../entities/patient-model";
import AppDataSource from "../database/datasource";
import { IdentificationType } from "../entities/identification-type-model";
import { status } from "../config/constants";

export class PatientsService {
    private repo = AppDataSource.getRepository(Patient);
    private typeRepo = AppDataSource.getRepository(IdentificationType);

    async getAll(filters: {
        numero_identificacion?: string | undefined,
        nombre_completo?: string | undefined,
        email?: string | undefined,
        estado?: 'ACTIVO' | 'INACTIVO' | undefined,
        page?: number,
        limit?: number
    }) {
        console.log(filters)
        const qb = this.repo.createQueryBuilder('patient')
            .leftJoinAndSelect('patient.tipoIdentificacion', 'tipoIdentificacion');

        if (filters.numero_identificacion) {
            qb.andWhere('patient.numero_identificacion LIKE :numero', { numero: `%${filters.numero_identificacion}%` });
        }
        if (filters.nombre_completo) {
            qb.andWhere('patient.nombre_completo LIKE :nombre', { nombre: `%${filters.nombre_completo}%` });
        }
        if (filters.email) {
            qb.andWhere('patient.email LIKE :email', { email: `%${filters.email}%` });
        }

        if (filters.estado) {
            qb.andWhere('patient.estado = :estado', { estado: filters.estado });
        } else {
            qb.andWhere('patient.estado = :estado', { estado: 'ACTIVO' });
        }

        const page = filters.page || 1;
        const limit = filters.limit || 10;
        qb.skip((page - 1) * limit).take(limit);

        const [data, total] = await qb.getManyAndCount();

        return {
            rows: data,
            totalRows: total,

        };
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
            where: { codigo_tipo_identificacion: data.codigo_tipo_identificacion! },
        });
        if (!type) {
            throw new Error(`Identification type with code ${data.codigo_tipo_identificacion} not found`);
        }

        const newPatient = this.repo.create(data);
        newPatient.tipoIdentificacion = type;
        newPatient.id_tipo = type.id_tipo

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
        if (!patient) {
            throw new Error(`Patient with id ${id} not found`);
        }

        if (data.id_tipo !== undefined || data.codigo_tipo_identificacion !== undefined || data.numero_identificacion !== undefined) {

            throw new Error(`id_tipo, codigo_tipo_identificacion, numero_identificacion not allowed`);

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
        if (!patient) {
            throw new Error(`Patient with id ${id} not found`);
        }

        patient.estado = status.inactive
        patient.fecha_modificacion = new Date()
        patient.usuario_modificacion = 'admin'
        return this.repo.save(patient);
    }
}