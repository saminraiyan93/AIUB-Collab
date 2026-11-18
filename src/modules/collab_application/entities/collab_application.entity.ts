import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApplicationStatus } from "../../../common/enums/application-status.enum";
import { CollabPost } from "../../collab_post/entities/collab_post.entity";
import { UserProfile } from "../../user_profile/entities/user_profile.entity";
import { UserProfileContact } from "../../user_profile_contact/entities/user_profile_contact.entity";

@Entity({ name: "collab_applications" })
@Index(
  "UQ_collab_applications_post_applicant",
  ["collab_post_id", "applicant_profile_id"],
  { unique: true },
)
export class CollabApplication {
  @PrimaryGeneratedColumn("uuid")
  collab_application_id!: string;

  @Column({ type: "uuid" })
  collab_post_id!: string;

  @ManyToOne(() => CollabPost, { nullable: false })
  @JoinColumn({
    name: "collab_post_id",
    referencedColumnName: "collab_post_id",
  })
  collab_post!: CollabPost;

  @Column({ type: "uuid" })
  applicant_profile_id!: string;

  @ManyToOne(() => UserProfile, { nullable: false })
  @JoinColumn({
    name: "applicant_profile_id",
    referencedColumnName: "user_profile_id",
  })
  applicant_profile!: UserProfile;

  @Column({ type: "varchar" })
  applicant_message!: string;

  @Column({ type: "varchar" })
  application_status!: ApplicationStatus;

  @Column({ type: "uuid" })
  applicant_contact_id!: string;

  @ManyToOne(() => UserProfileContact, { nullable: false })
  @JoinColumn({
    name: "applicant_contact_id",
    referencedColumnName: "user_profile_contact_id",
  })
  applicant_contact!: UserProfileContact;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}