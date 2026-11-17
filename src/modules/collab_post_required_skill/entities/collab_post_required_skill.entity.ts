import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { CollabPost } from "../../collab_post/entities/collab_post.entity";
import { Skill } from "../../skill/entities/skill.entity";

@Entity({ name: "collab_post_required_skills" })
@Index(["collab_post_id", "skill_id"], { unique: true })
export class CollabPostRequiredSkill {
    @PrimaryGeneratedColumn("uuid")
    post_required_skill_id!: string;

    @Column({ type: "uuid" })
    collab_post_id!: string;

    @ManyToOne(() => CollabPost, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({
        name: "collab_post_id",
        referencedColumnName: "collab_post_id",
    })
    collab_post!: CollabPost;

    @Column({ type: "uuid" })
    skill_id!: string;

    @ManyToOne(() => Skill, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({
        name: "skill_id",
        referencedColumnName: "skill_id",
    })
    skill!: Skill;
}