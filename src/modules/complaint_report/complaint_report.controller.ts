import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import { ComplaintReportService } from "./complaint_report.service";
import {CreateComplaintReportDto, UpdateComplaintReportDto} from "./dto/complaint_report.dto";
import {JwtGuard} from "@/common/guard/jwt.guard";
import {RolesGuard} from "@/common/guard/roles.guard";
import {Roles} from "@/common/decorators/user-role.decorator";
import {UserRole} from "@/common/enums/user-role.enum";

@Controller("complaint-reports")
export class ComplaintReportController {
    constructor(
        private readonly complaintReportService: ComplaintReportService,
    ) {}

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getComplaintReports() {
        return await this.complaintReportService.getComplaintReports();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getComplaintReportById(@Param("id") id: string) {
        return await this.complaintReportService.getComplaintReportById(id);
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async createComplaintReport(@Body() dto: CreateComplaintReportDto) {
        return await this.complaintReportService.createComplaintReport(dto);
    }

    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateComplaintReport(@Param("id") id: string, @Body() dto: UpdateComplaintReportDto) {
        return await this.complaintReportService.updateComplaintReport(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteComplaintReport(@Param("id") id: string) {
        return await this.complaintReportService.deleteComplaintReport(id);
    }
}