import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { CollabPost } from "../../collab_post/entities/collab_post.entity";
import { Interest } from "../../interest/entities/interest.entity";

@Entity({ name: "collab_post_preferred_interests" })
@Index(["collab_post_id", "interest_id"], { unique: true })
export class CollabPostPreferredInterest {
    @PrimaryGeneratedColumn("uuid")
    post_preferred_interest_id!: string;

    @Column({ type: "uuid" })
    collab_post_id!: string;

    @ManyToOne(() => CollabPost, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({
        name: "collab_post_id",
        referencedColumnName: "collab_post_id",
    })
    collab_post!: CollabPost;

    @Column({ type: "uuid" })
    interest_id!: string;

    @ManyToOne(() => Interest, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({
        name: "interest_id",
        referencedColumnName: "interest_id",
    })
    interest!: Interest;
}