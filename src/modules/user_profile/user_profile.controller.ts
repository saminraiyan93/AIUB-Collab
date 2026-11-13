import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import{UserProfileService} from "./user_profile.service";
import { CreateUserProfileDto, UpdateUserProfileDto } from "./dto/user_profile.dto";

@Controller("user-profiles")
export class UserProfileController {

    constructor(private readonly userProfileService: UserProfileService) {}

    @Get()
    async getUserProfiles() {
        return await this.userProfileService.getUserProfiles();
    }

    @Get(":id")
    async getUserProfilesById(@Param("id") id: string) {
        return await this.userProfileService.getUserProfilesById(id);
    }

    @Post()
        async createUserProfile(@Body() dto: CreateUserProfileDto) {
            return await this.userProfileService.createUserProfile(dto);
    }
    
    @Patch(":id")
        async updateUserProfile(@Param("id") id: string, @Body() dto: UpdateUserProfileDto) {
            return await this.userProfileService.updateUserProfile(id, dto);
    }

    @Delete(":id")
        async deleteUserProfile(@Param("id") id: string) {
            return await this.userProfileService.deleteUserProfile(id);
    }

}