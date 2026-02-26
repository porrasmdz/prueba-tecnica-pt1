import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity({ name: "users" })
@Unique(["username"])
export class User {
    @PrimaryGeneratedColumn("identity", { type: "number", name: "id_user" })
    id_user!: number;

    @Column({ length: 50 })
    username!: string;

    @Column({ length: 255 })
    password!: string;
}