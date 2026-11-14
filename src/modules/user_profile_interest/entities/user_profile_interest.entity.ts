import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Interest } from "../../interest/entities/interest.entity";
import { UserProfile } from "../../user_profile/entities/user_profile.entity";

@Entity({ name: "user_profile_interests" })
export class UserProfileInterest {
    @PrimaryGeneratedColumn("uuid")
    user_profile_interest_id!: string;

    @Column({ type: "uuid" })
    user_profile_id!: string;

    @ManyToOne(() => UserProfile, { nullable: false })
    @JoinColumn({
        name: "user_profile_id",
        referencedColumnName: "user_profile_id",
    })
    user_profile!: UserProfile;

    @Column({ type: "uuid" })
    interest_id!: string;

    @ManyToOne(() => Interest, { nullable: false })
    @JoinColumn({
        name: "interest_id",
        referencedColumnName: "interest_id",
    })
    interest!: Interest;

}