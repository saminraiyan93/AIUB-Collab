import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import { ComplaintReportService } from "./complaint_report.service";
import {CreateComplaintReportDto, UpdateComplaintReportDto} from "./dto/complaint_report.dto";

@Controller("complaint-reports")
export class ComplaintReportController {
    constructor(
        private readonly complaintReportService: ComplaintReportService,
    ) {}

    @Get()
    async getComplaintReports() {
        return await this.complaintReportService.getComplaintReports();
    }

    @Get(":id")
    async getComplaintReportById(@Param("id") id: string) {
        return await this.complaintReportService.getComplaintReportById(id);
    }

    @Post()
    async createComplaintReport(@Body() dto: CreateComplaintReportDto) {
        return await this.complaintReportService.createComplaintReport(dto);
    }

    @Patch(":id")
    async updateComplaintReport(@Param("id") id: string, @Body() dto: UpdateComplaintReportDto) {
        return await this.complaintReportService.updateComplaintReport(id, dto);
    }

    @Delete(":id")
    async deleteComplaintReport(@Param("id") id: string) {
        return await this.complaintReportService.deleteComplaintReport(id);
    }
}