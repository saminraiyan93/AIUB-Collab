import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { UserProfile } from "../../user_profile/entities/user_profile.entity";
import { CollabCategory } from "../../../common/enums/collab-category.enum";
import { CollabType } from "../../../common/enums/collab-type.enum";
import { LocationType } from "../../../common/enums/location-type.enum";
import { PostStatus } from "../../../common/enums/post-status.enum";

@Entity({ name: "collab_posts" })
export class CollabPost {
    @PrimaryGeneratedColumn("uuid")
    collab_post_id!: string;

    @Column({ type: "uuid" })
    user_profile_id!: string;

    @ManyToOne(() => UserProfile, { nullable: false })
    @JoinColumn({
        name: "user_profile_id",
        referencedColumnName: "user_profile_id",
    })
    user_profile!: UserProfile;

    @Column({ type: "varchar" })
    post_title!: string;

    @Column({ type: "varchar", nullable: true })
    post_description?: string | null;

    @Column({ type: "varchar" })
    collab_category!: CollabCategory;

    @Column({ type: "varchar" })
    collab_type!: CollabType;

    @Column({ type: "integer" })
    collaborators_needed!: number;

    @Column({ type: "timestamp" })
    application_deadline!: Date;

    @Column({ type: "varchar" })
    location_type!: LocationType;

    @Column({ type: "varchar" })
    post_status!: PostStatus;

    // Temporarily using post_contact_id as a string until the UserProfileContact entity is completed.
    @Column({ type: "uuid" })
    post_contact_id!: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    created_at?: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    updated_at?: Date;
}