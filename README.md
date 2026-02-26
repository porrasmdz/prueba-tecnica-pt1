init cmd
$ set DEBUG=myapp:* & npm start

BEGIN
    FOR c IN (SELECT constraint_name, table_name 
              FROM user_constraints
              WHERE table_name IN ('DAF_TIPOS_IDENTIFICACION','MGM_PACIENTES')) LOOP
        EXECUTE IMMEDIATE 'ALTER TABLE ' || c.table_name || ' DROP CONSTRAINT ' || c.constraint_name;
    END LOOP;
END;
/


----INIT
BEGIN
    FOR c IN (SELECT constraint_name, table_name 
              FROM user_constraints
              WHERE constraint_type = 'R' -- solo FOREIGN KEY
                AND table_name IN ('MGM_PACIENTES','DAF_TIPOS_IDENTIFICACION')) LOOP
        EXECUTE IMMEDIATE 'ALTER TABLE ' || c.table_name || ' DROP CONSTRAINT ' || c.constraint_name;
    END LOOP;
END;
/

BEGIN
    FOR c IN (SELECT constraint_name, table_name 
              FROM user_constraints
              WHERE table_name IN ('MGM_PACIENTES','DAF_TIPOS_IDENTIFICACION')) LOOP
        EXECUTE IMMEDIATE 'ALTER TABLE ' || c.table_name || ' DROP CONSTRAINT ' || c.constraint_name;
    END LOOP;
END;
/

BEGIN
    FOR t IN (SELECT trigger_name FROM user_triggers WHERE trigger_name IN ('MGM_PACIENTES_BI')) LOOP
        EXECUTE IMMEDIATE 'DROP TRIGGER ' || t.trigger_name;
    END LOOP;
END;
/

BEGIN
    FOR s IN (SELECT sequence_name FROM user_sequences WHERE sequence_name IN ('MGM_SEQ_PACIENTE')) LOOP
        EXECUTE IMMEDIATE 'DROP SEQUENCE ' || s.sequence_name;
    END LOOP;
END;
/

-- 🔹 Finalmente eliminar las tablas
BEGIN
    FOR t IN (SELECT table_name FROM user_tables 
              WHERE table_name IN ('MGM_PACIENTES','DAF_TIPOS_IDENTIFICACION')) LOOP
        EXECUTE IMMEDIATE 'DROP TABLE ' || t.table_name || ' CASCADE CONSTRAINTS';
    END LOOP;
END;
/
