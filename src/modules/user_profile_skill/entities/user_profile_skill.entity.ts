import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "../../skill/entities/skill.entity";
import { UserProfile } from "../../user_profile/entities/user_profile.entity";

@Entity({ name: "user_profile_skills" })
export class UserProfileSkill {
    @PrimaryGeneratedColumn("uuid")
    user_profile_skill_id!: string;

    @Column({ type: "uuid" })
    user_profile_id!: string;

    @ManyToOne(() => UserProfile, { nullable: false })
    @JoinColumn({
        name: "user_profile_id",
        referencedColumnName: "user_profile_id",
    })
    user_profile!: UserProfile;

    @Column({ type: "uuid" })
    skill_id!: string;

    @ManyToOne(() => Skill, { nullable: false })
    @JoinColumn({
        name: "skill_id",
        referencedColumnName: "skill_id",
    })
    skill!: Skill;

}