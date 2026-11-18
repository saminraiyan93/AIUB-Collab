import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CollabPost } from "../../collab_post/entities/collab_post.entity";
import { Department } from "../../department/entities/department.entity";

@Entity({ name: "collab_post_preferred_departments" })
@Index(
  "UQ_collab_post_preferred_departments_post_department",
  ["collab_post_id", "department_id"],
  { unique: true },
)
export class CollabPostPreferredDepartment {
  @PrimaryGeneratedColumn("uuid")
  post_preferred_department_id!: string;

  @Column({ type: "uuid" })
  collab_post_id!: string;

  @ManyToOne(() => CollabPost, { nullable: false })
  @JoinColumn({
    name: "collab_post_id",
    referencedColumnName: "collab_post_id",
  })
  collab_post!: CollabPost;

  @Column({ type: "uuid" })
  department_id!: string;

  @ManyToOne(() => Department, { nullable: false })
  @JoinColumn({
    name: "department_id",
    referencedColumnName: "department_id",
  })
  department!: Department;
}