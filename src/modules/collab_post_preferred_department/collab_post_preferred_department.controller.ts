import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  CreateCollabPostPreferredDepartmentDto,
  UpdateCollabPostPreferredDepartmentDto,
} from "./dto/collab_post_preferred_department.dto";
import { CollabPostPreferredDepartmentService } from "./collab_post_preferred_department.service";

@Controller("collab-post-preferred-departments")
export class CollabPostPreferredDepartmentController {
  constructor(
    private readonly preferredDepartmentService: CollabPostPreferredDepartmentService,
  ) {}

  @Get()
  getCollabPostPreferredDepartments() {
    return this.preferredDepartmentService.getCollabPostPreferredDepartments();
  }

  @Get(":id")
  getCollabPostPreferredDepartmentById(@Param("id") id: string) {
    return this.preferredDepartmentService.getCollabPostPreferredDepartmentById(
      id,
    );
  }

  @Post()
  createCollabPostPreferredDepartment(
    @Body() dto: CreateCollabPostPreferredDepartmentDto,
  ) {
    return this.preferredDepartmentService.createCollabPostPreferredDepartment(
      dto,
    );
  }

  @Patch(":id")
  updateCollabPostPreferredDepartment(
    @Param("id") id: string,
    @Body() dto: UpdateCollabPostPreferredDepartmentDto,
  ) {
    return this.preferredDepartmentService.updateCollabPostPreferredDepartment(
      id,
      dto,
    );
  }

  @Delete(":id")
  deleteCollabPostPreferredDepartment(@Param("id") id: string) {
    return this.preferredDepartmentService.deleteCollabPostPreferredDepartment(
      id,
    );
  }
}