import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollabPost } from "../collab_post/entities/collab_post.entity";
import { Department } from "../department/entities/department.entity";
import { CollabPostPreferredDepartmentController } from "./collab_post_preferred_department.controller";
import { CollabPostPreferredDepartmentService } from "./collab_post_preferred_department.service";
import { CollabPostPreferredDepartment } from "./entities/collab_post_preferred_department.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CollabPostPreferredDepartment,
      CollabPost,
      Department,
    ]),
  ],
  controllers: [CollabPostPreferredDepartmentController],
  providers: [CollabPostPreferredDepartmentService],
  exports: [CollabPostPreferredDepartmentService],
})
export class CollabPostPreferredDepartmentModule {}