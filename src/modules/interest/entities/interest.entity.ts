import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "interests" })
export class Interest {
    @PrimaryGeneratedColumn("uuid")
    interest_id!: string;

    @Column()
    interest_name!: string;

}