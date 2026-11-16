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
  CreateUserLinkedProfileDto,
  UpdateUserLinkedProfileDto,
} from "./dto/user_linked_profile.dto";
import { UserLinkedProfileService } from "./user_linked_profile.service";

@Controller("user-linked-profiles")
export class UserLinkedProfileController {
  constructor(
    private readonly userLinkedProfileService: UserLinkedProfileService,
  ) {}

  @Get()
  async getUserLinkedProfiles() {
    return await this.userLinkedProfileService.getUserLinkedProfiles();
  }

  @Get(":id")
  async getUserLinkedProfileById(@Param("id") id: string) {
    return await this.userLinkedProfileService.getUserLinkedProfileById(id);
  }

  @Post()
  async createUserLinkedProfile(
    @Body() dto: CreateUserLinkedProfileDto,
  ) {
    return await this.userLinkedProfileService.createUserLinkedProfile(dto);
  }

  @Patch(":id")
  async updateUserLinkedProfile(
    @Param("id") id: string,
    @Body() dto: UpdateUserLinkedProfileDto,
  ) {
    return await this.userLinkedProfileService.updateUserLinkedProfile(
      id,
      dto,
    );
  }

  @Delete(":id")
  async deleteUserLinkedProfile(@Param("id") id: string) {
    return await this.userLinkedProfileService.deleteUserLinkedProfile(id);
  }
}