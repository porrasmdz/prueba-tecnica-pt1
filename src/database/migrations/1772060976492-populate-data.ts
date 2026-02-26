import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateData1772060976492 implements MigrationInterface {
    name = 'PopulateData1772060976492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO daf_tipos_identificacion
            ( "nombre_tipo_identificacion", "codigo_tipo_identificacion", "estado")
            VALUES
            ('Cédula', 'CED', 'ACTIVO')
        `);

        await queryRunner.query(`
            INSERT INTO daf_tipos_identificacion
            ( "nombre_tipo_identificacion", "codigo_tipo_identificacion", "estado")
            VALUES
            ('Pasaporte', 'PAS', 'ACTIVO')
        `);
        await queryRunner.commitTransaction()
        await queryRunner.query(`
            INSERT INTO mgm_pacientes
            (
                "codigo_tipo_identificacion",
                "numero_identificacion",
                "primer_nombre",
                "segundo_nombre",
                "primer_apellido",
                "segundo_apellido",
                "nombre_completo",
                "email",
                "estado",
                "fecha_ingreso",
                "usuario_ingreso",
                "fecha_modificacion",
                "usuario_modificacion",
                "id_tipo"
            )
            VALUES
            (
                'CED',
                '0923456789',
                'Juan',
                'Carlos',
                'Pérez',
                'García',
                'Juan Carlos Pérez García',
                'juan@example.com',
                'ACTIVO',
                SYSDATE,
                'admin',
                SYSDATE,
                'admin',
                1
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM daf_tipos_identificacion
            WHERE "codigo_tipo_identificacion" IN ('CED','PAS')
        `);
    }

}
