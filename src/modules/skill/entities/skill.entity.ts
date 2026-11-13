import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "skills" })
export class Skill {
    @PrimaryGeneratedColumn("uuid")
    skill_id!: string;

    @Column()
    skill_name!: string;

}