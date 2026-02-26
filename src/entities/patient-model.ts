import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { IdentificationType } from "./identification-type-model";

@Entity({ name: 'mgm_pacientes' })
export class Patient {

    @PrimaryColumn()
    id_paciente!: number;

    @Column()
    codigo_tipo_identificacion!: string

    @Column()
    numero_identificacion!: string

    @Column()
    primer_nombre!: string

    @Column({ nullable: true })
    segundo_nombre!: string

    @Column()
    primer_apellido!: string

    @Column({ nullable: true })
    segundo_apellido!: string

    @Column()
    nombre_completo!: string

    @Column()
    email!: string

    @Column()
    estado!: string

    @Column({ type: "timestamp", name: "fecha_ingreso" })
    fecha_ingreso!: Date
    @Column()
    usuario_ingreso!: string

    @Column({ type: "timestamp", name: "fecha_modificacion", nullable: true })
    fecha_modificacion!: Date
    @Column({ nullable: true })
    usuario_modificacion!: string

    @ManyToOne(() => IdentificationType, {
        nullable: false
    })
    @JoinColumn({
        name: "id_tipo"
    })
    tipoIdentificacion!: IdentificationType;
    @Column()
    id_tipo!: number;

}