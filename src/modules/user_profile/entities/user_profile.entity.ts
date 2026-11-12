import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AcademicIdentity } from "../../../common/enums/academic-identity.enum";
import { Department } from "../../department/entities/department.entity";
import { User } from "../../user/entities/user.entity";

@Entity({ name: "user_profiles" })
export class UserProfile {
    @PrimaryGeneratedColumn("uuid")
    user_profile_id!: string;

    @Column({ type: "uuid", unique: true })
    user_id!: string;

    @OneToOne(() => User, { nullable: false })
    @JoinColumn({ name: "user_id", referencedColumnName: "user_id" })
    user!: User;

    @Column({ type: "varchar", nullable: true })
    profile_image?: string | null;

    @Column({ type: "varchar" })
    academic_identity!: AcademicIdentity;

    @Column({ type: "uuid" })
    department_id!: string;

    @ManyToOne(() => Department, { nullable: false })
    @JoinColumn({ name: "department_id", referencedColumnName: "department_id" })
    department!: Department;

    @Column({ type: "varchar", nullable: true })
    bio?: string | null;

    @Column()
    created_at?: Date;

    @Column()
    updated_at?: Date;

}