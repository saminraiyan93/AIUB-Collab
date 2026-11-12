import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "departments" })
export class Department {
    @PrimaryGeneratedColumn("uuid")
    department_id!: string;

    @Column({ unique: true })
    department_name!: string;

}