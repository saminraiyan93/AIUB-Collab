import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  CreateCollabPostPreferredAcademicIdentityDto,
  UpdateCollabPostPreferredAcademicIdentityDto,
} from "./dto/collab_post_preferred_academic_identity.dto";
import { CollabPostPreferredAcademicIdentityService } from "./collab_post_preferred_academic_identity.service";

@Controller("collab-post-preferred-academic-identities")
export class CollabPostPreferredAcademicIdentityController {
  constructor(
    private readonly collabPostPreferredAcademicIdentityService: CollabPostPreferredAcademicIdentityService,
  ) {}

  @Get()
  async getAll() {
    return await this.collabPostPreferredAcademicIdentityService.getAll();
  }

  @Get(":id")
  async getById(@Param("id", ParseUUIDPipe) id: string) {
    return await this.collabPostPreferredAcademicIdentityService.getById(id);
  }

  @Post()
  async create(
    @Body() dto: CreateCollabPostPreferredAcademicIdentityDto,
  ) {
    return await this.collabPostPreferredAcademicIdentityService.create(dto);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateCollabPostPreferredAcademicIdentityDto,
  ) {
    return await this.collabPostPreferredAcademicIdentityService.update(
      id,
      dto,
    );
  }

  @Delete(":id")
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    return await this.collabPostPreferredAcademicIdentityService.delete(id);
  }
}