import { IsEnum, IsNotEmpty, IsOptional, IsUUID} from "class-validator";
import { ReportReason } from "../../../common/enums/report-reason.enum";
import { ReportStatus } from "../../../common/enums/report-status.enum";

export class CreateComplaintReportDto {
    @IsNotEmpty({ message: "reporter_id is required" })
    @IsUUID(undefined, {
        message: "reporter_id must be a valid UUID",
    })
    reporter_id!: string;

    @IsOptional()
    @IsUUID(undefined, {
        message: "reported_user_id must be a valid UUID",
    })
    reported_user_id?: string | null;

    @IsOptional()
    @IsUUID(undefined, {
        message: "collab_post_id must be a valid UUID",
    })
    collab_post_id?: string | null;

    @IsNotEmpty({ message: "reason is required" })
    @IsEnum(ReportReason, {
        message:
            "reason must be Harassment, Spam, Fraud, Misleading_Information, Inappropriate_Content, or Other",
    })
    reason!: ReportReason;

    @IsOptional()
    @IsString({
        message: "description must be a string",
    })
    description?: string | null;
}

export class UpdateComplaintReportDto {
    @IsOptional()
    @IsEnum(ReportStatus, {
        message:
            "report_status must be Submitted, Under Review, Resolved, or Rejected",
    })
    report_status?: ReportStatus;

    @IsOptional()
    @IsUUID(undefined, {
        message: "reviewed_by_admin_id must be a valid UUID",
    })
    reviewed_by_admin_id?: string;
}