import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicIdentity } from "../../../common/enums/academic-identity.enum";
import { CollabPost } from "../../collab_post/entities/collab_post.entity";

@Entity({ name: "collab_post_preferred_academic_identities" })
@Index(
  ["collab_post_id", "academic_identity"],
  { unique: true },
)
export class CollabPostPreferredAcademicIdentity {
  @PrimaryGeneratedColumn("uuid")
  post_preferred_academic_identity_id!: string;

  @Column({ type: "uuid" })
  collab_post_id!: string;

  @ManyToOne(() => CollabPost, { nullable: false })
  @JoinColumn({
    name: "collab_post_id",
    referencedColumnName: "collab_post_id",
  })
  collab_post!: CollabPost;

  @Column({ type: "varchar" })
  academic_identity!: AcademicIdentity;
}