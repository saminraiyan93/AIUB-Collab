import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AccountStatus } from "../../../common/enums/account-status.enum";
import { AdminLevel } from "../../../common/enums/admin-level.enum";
import { UserRole } from "../../../common/enums/user-role.enum";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id!: string;

    @Column()
    user_name!: string;

    @Column()
    user_email!: string;

    @Column()
    user_password!: string;

    @Column({ type: "varchar" })
    user_role!: UserRole;

    @Column({ type: "varchar", nullable: true })
    admin_level?: AdminLevel | null;

    @Column({ type: "varchar" })
    account_status!: AccountStatus;

    @Column()
    created_at?: Date;

    @Column()
    updated_at?: Date;

}