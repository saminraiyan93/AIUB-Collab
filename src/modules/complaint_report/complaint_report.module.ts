import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComplaintReportController } from "./complaint_report.controller";
import { ComplaintReportService } from "./complaint_report.service";
import { ComplaintReport } from "./entities/complaint_report.entity";
import { User } from "../user/entities/user.entity";
import { CollabPost } from "../collab_post/entities/collab_post.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ComplaintReport, User, CollabPost])],
    controllers: [ComplaintReportController],
    providers: [ComplaintReportService],
    exports: [ComplaintReportService],
})
export class ComplaintReportModule {}