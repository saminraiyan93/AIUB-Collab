import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComplaintReportController } from "./complaint_report.controller";
import { ComplaintReportService } from "./complaint_report.service";
import { ComplaintReport } from "./entities/complaint_report.entity";
import { User } from "../user/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ComplaintReport, User, /*CollabPost*/])], // Temporarily using collab_post_id as a string until the collab post module is completed
    controllers: [ComplaintReportController],
    providers: [ComplaintReportService],
    exports: [ComplaintReportService],
})
export class ComplaintReportModule {}