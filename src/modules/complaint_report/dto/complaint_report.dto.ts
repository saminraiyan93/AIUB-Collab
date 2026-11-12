import {IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUUID} from "class-validator";
import { ReportReason } from "../../../common/enums/report-reason.enum";
import { ReportStatus } from "../../../common/enums/report-status.enum";

export class CreateComplaintReportDto {
    @IsNotEmpty()
    @IsUUID()
    reporter_id!: string;

    @IsOptional()
    @IsUUID()
    reported_user_id?: string | null;

    @IsOptional()
    @IsUUID()
    collab_post_id?: string | null;

    @IsEnum(ReportReason)
    @IsNotEmpty()
    reason!: ReportReason;

    @IsOptional()
    description?: string | null;
}

export class UpdateComplaintReportDto {
    @IsNotEmpty()
    @IsEnum(ReportStatus)
    report_status?: ReportStatus;

    @IsNotEmpty()
    @IsUUID()
    reviewed_by_admin_id?: string;
}