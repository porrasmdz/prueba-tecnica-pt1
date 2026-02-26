// import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Patient } from "../entities/patient-model";
import { IdentificationType } from "../entities/identification-type-model";


const AppDataSource = new DataSource({
    type: "oracle",
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    serviceName: process.env.DB_SERVICE!,
    entities: [Patient, IdentificationType],
    migrations: ["src/database/migrations/*.ts"],
    synchronize: false,
    logging: true,
})

export default AppDataSource
