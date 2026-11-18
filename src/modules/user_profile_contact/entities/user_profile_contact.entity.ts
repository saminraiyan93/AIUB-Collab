import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { ContactVia } from "../../../common/enums/contact-via.enum";
import { UserProfile } from "../../user_profile/entities/user_profile.entity";

@Entity({ name: "user_profile_contacts" })
export class UserProfileContact {
    @PrimaryGeneratedColumn("uuid")
    user_profile_contact_id!: string;

    @Column({ type: "uuid" })
    user_profile_id!: string;

    @ManyToOne(() => UserProfile, { nullable: false })
    @JoinColumn({
        name: "user_profile_id",
        referencedColumnName: "user_profile_id",
    })
    user_profile!: UserProfile;

    @Column({ type: "varchar" })
    contact_via!: ContactVia;

    @Column({ type: "varchar" })
    contact_value!: string;
}