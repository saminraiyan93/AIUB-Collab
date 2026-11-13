import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserProfileSkillService } from "./user_profile_skill.service";
import {
    CreateUserProfileSkillDto,
    UpdateUserProfileSkillDto,
} from "./dto/user_profile_skill.dto";

@Controller("user-profile-skills")
export class UserProfileSkillController {
    constructor(
        private readonly userProfileSkillService: UserProfileSkillService,
    ) {}

    @Get()
    async getUserProfileSkills() {
        return await this.userProfileSkillService.getUserProfileSkills();
    }

    @Get(":id")
    async getUserProfileSkillById(@Param("id") id: string) {
        return await this.userProfileSkillService.getUserProfileSkillById(id);
    }

    @Post()
    async createUserProfileSkill(@Body() dto: CreateUserProfileSkillDto) {
        return await this.userProfileSkillService.createUserProfileSkill(dto);
    }

    @Patch(":id")
    async updateUserProfileSkill(
        @Param("id") id: string,
        @Body() dto: UpdateUserProfileSkillDto,
    ) {
        return await this.userProfileSkillService.updateUserProfileSkill(id, dto);
    }

    @Delete(":id")
    async deleteUserProfileSkill(@Param("id") id: string) {
        return await this.userProfileSkillService.deleteUserProfileSkill(id);
    }
}