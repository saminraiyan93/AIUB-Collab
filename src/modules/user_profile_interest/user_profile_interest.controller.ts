import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import{UserProfileInterestService} from "./user_profile_interest.service";
import {
    CreateUserProfileInterestDto,
    UpdateUserProfileInterestDto,
} from "./dto/user_profile_interest.dto";

@Controller("user-profile-interests")
export class UserProfileInterestController {

    constructor(private readonly userProfileInterestService: UserProfileInterestService) {}

    @Get()
    async getUserProfileInterests() {
        return await this.userProfileInterestService.getUserProfileInterests();
    }

    @Get(":id")
    async getUserProfileInterestsById(@Param("id") id: string) {
        return await this.userProfileInterestService.getUserProfileInterestsById(id);
    }

    @Post()
        async createUserProfileInterest(@Body() dto: CreateUserProfileInterestDto) {
            return await this.userProfileInterestService.createUserProfileInterest(dto);
    }
    
    @Patch(":id")
        async updateUserProfileInterest(@Param("id") id: string, @Body() dto: UpdateUserProfileInterestDto) {
            return await this.userProfileInterestService.updateUserProfileInterest(id, dto);
    }

    @Delete(":id")
        async deleteUserProfileInterest(@Param("id") id: string) {
            return await this.userProfileInterestService.deleteUserProfileInterest(id);
    }

}