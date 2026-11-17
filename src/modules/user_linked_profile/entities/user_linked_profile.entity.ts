import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserProfile } from "../../user_profile/entities/user_profile.entity";

@Entity({ name: "user_linked_profiles" })
@Index(["user_profile_id", "platform_name"], { unique: true })
export class UserLinkedProfile {
  @PrimaryGeneratedColumn("uuid")
  linked_profile_id!: string;

  @Column({ type: "uuid" })
  user_profile_id!: string;

  @ManyToOne(() => UserProfile, { nullable: false })
  @JoinColumn({
    name: "user_profile_id",
    referencedColumnName: "user_profile_id",
  })
  user_profile!: UserProfile;

  @Column({ type: "varchar" })
  platform_name!: string;

  @Column({ type: "varchar" })
  profile_url!: string;
}