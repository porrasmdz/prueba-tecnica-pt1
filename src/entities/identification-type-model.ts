// import "reflect-metadata"
import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "daf_tipos_identificacion" })

export class IdentificationType {
    @PrimaryGeneratedColumn("identity", {
        type: "number",
        name: "id_tipo",
    })
    id_tipo!: number;

    @Column()
    nombre_tipo_identificacion!: string;

    @Column({ unique: true })
    codigo_tipo_identificacion!: string;

    @Column()
    estado!: string
    
}