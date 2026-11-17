import {Body,Controller,Delete,Get,Param,Patch,Post} from "@nestjs/common";
import { UserProfileContactService } from "./user_profile_contact.service";
import {CreateUserProfileContactDto, UpdateUserProfileContactDto} from "./dto/user_profile_contact.dto";

@Controller("user-profile-contacts")
export class UserProfileContactController {
    constructor(
        private readonly userProfileContactService: UserProfileContactService,
    ) {}

    @Get()
    async getUserProfileContacts() {
        return await this.userProfileContactService.getUserProfileContacts();
    }

    @Get(":id")
    async getUserProfileContactById(@Param("id") id: string) {
        return await this.userProfileContactService.getUserProfileContactById(id);
    }

    @Post()
    async createUserProfileContact(
        @Body() dto: CreateUserProfileContactDto,
    ) {
        return await this.userProfileContactService.createUserProfileContact(dto);
    }

    @Patch(":id")
    async updateUserProfileContact(
        @Param("id") id: string,
        @Body() dto: UpdateUserProfileContactDto,
    ) {
        return await this.userProfileContactService.updateUserProfileContact(
            id,
            dto,
        );
    }

    @Delete(":id")
    async deleteUserProfileContact(@Param("id") id: string) {
        return await this.userProfileContactService.deleteUserProfileContact(id);
    }
}