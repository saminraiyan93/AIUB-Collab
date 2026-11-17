import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CollabApplicationService } from "./collab_application.service";
import {
  CreateCollabApplicationDto,
  UpdateCollabApplicationDto,
} from "./dto/collab_application.dto";

@Controller("collab-applications")
export class CollabApplicationController {
  constructor(
    private readonly collabApplicationService: CollabApplicationService,
  ) {}

  @Get()
  async getCollabApplications() {
    return this.collabApplicationService.getCollabApplications();
  }

  @Get(":id")
  async getCollabApplicationById(@Param("id") id: string) {
    return this.collabApplicationService.getCollabApplicationById(id);
  }

  @Post()
  async createCollabApplication(@Body() dto: CreateCollabApplicationDto) {
    return this.collabApplicationService.createCollabApplication(dto);
  }

  @Patch(":id")
  async updateCollabApplication(
    @Param("id") id: string,
    @Body() dto: UpdateCollabApplicationDto,
  ) {
    return this.collabApplicationService.updateCollabApplication(id, dto);
  }

  @Delete(":id")
  async deleteCollabApplication(@Param("id") id: string) {
    return this.collabApplicationService.deleteCollabApplication(id);
  }
}
