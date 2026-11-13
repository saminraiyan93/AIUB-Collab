import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ComplaintReport } from "./entities/complaint_report.entity";
import {CreateComplaintReportDto, UpdateComplaintReportDto} from "./dto/complaint_report.dto";
import { ReportStatus } from "../../common/enums/report-status.enum";
import { User } from "../user/entities/user.entity";

@Injectable()
export class ComplaintReportService {
    constructor(
        @InjectRepository(ComplaintReport)
        private readonly complaintReportRepository: Repository<ComplaintReport>,
    ) {}

    async getComplaintReports() {
        return await this.complaintReportRepository.find({
            relations: ["reporter","reported_user","collab_post","reviewed_by_admin"]
        });
    }

    async getComplaintReportById(id: string) {
        const complaintReport = await this.complaintReportRepository.findOne({
            where: {report_id: id},
            relations: ["reporter", "reported_user", "collab_post", "reviewed_by_admin"]
        });

        if (!complaintReport) {
            throw new NotFoundException("Complaint report not found");
        }

        return complaintReport;
    }

    async createComplaintReport(dto: CreateComplaintReportDto) {
        const complaintReport = this.complaintReportRepository.create({
                ...dto, 
                reporter: { user_id: dto.reporter_id },
                reported_user: dto.reported_user_id ? { user_id: dto.reported_user_id } : null,
                collab_post: dto.collab_post_id ? { collab_post_id: dto.collab_post_id } : null,
                reason: dto.reason,
                description: dto.description,
                report_status: ReportStatus.SUBMITTED});

        const savedComplaintReport = await this.complaintReportRepository.save(complaintReport);
        
        return {
            message: "Complaint report submitted successfully.",
            data: savedComplaintReport,
        };
    }

    async updateComplaintReport(id: string, dto: UpdateComplaintReportDto,) {
        const complaintReport = await this.getComplaintReportById(id);
        Object.assign(complaintReport, dto);

        if (dto.reviewed_by_admin_id) {
            complaintReport.reviewed_by_admin = {user_id: dto.reviewed_by_admin_id,} as User;
        }

        if (dto.report_status || dto.reviewed_by_admin_id) {
            complaintReport.reviewed_at = new Date();
        }

        const savedComplaintReport = await this.complaintReportRepository.save(complaintReport);
        return {
            message: "Complaint report updated successfully.",
            data: savedComplaintReport,
        };
    }

    async deleteComplaintReport(id: string) {
        await this.getComplaintReportById(id);
        return await this.complaintReportRepository.delete({
            report_id: id,
        });
    }
}