import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "../../user/entities/user.entity";
import { ReportReason } from "../../../common/enums/report-reason.enum";
import { ReportStatus } from "../../../common/enums/report-status.enum";

@Entity({ name: "complaint_reports" })
export class ComplaintReport {
    @PrimaryGeneratedColumn("uuid")
    report_id!: string;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "reporter_id" })
    reporter!: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "reported_user_id" })
    reported_user?: User | null;

    // Will be used in future after completion of collab post module
    // @ManyToOne(() => CollabPost, { nullable: true })
    // @JoinColumn({ name: "collab_post_id" })
    // collab_post?: CollabPost | null;

    // Temporarily using collab_post_id as a string until the collab post module is completed
    @Column({ type: "uuid", nullable: true })
    collab_post_id?: string | null;

    @Column({ type: "varchar" })
    reason!: ReportReason;

    @Column({ type: "varchar", nullable: true })
    description?: string | null;

    @Column({ type: "varchar" })
    report_status!: ReportStatus;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "reviewed_by_admin_id" })
    reviewed_by_admin?: User | null;

    @Column({
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
    })
    created_at?: Date;

    @Column({ type: "timestamp", nullable: true })
    reviewed_at?: Date | null;
}