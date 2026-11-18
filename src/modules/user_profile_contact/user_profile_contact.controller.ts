import {Body,Controller,Delete,Get,Param,Patch,Post, UseGuards,} from "@nestjs/common";
import { UserProfileContactService } from "./user_profile_contact.service";
import {CreateUserProfileContactDto, UpdateUserProfileContactDto} from "./dto/user_profile_contact.dto";
import { RolesGuard } from "@/src/common/guard/roles.guard";
import { JwtGuard } from "@/src/common/guard/jwt.guard";
import { UserRole } from "@/src/common/enums/user-role.enum";
import { Roles } from "@/src/common/decorators/user-role.decorator";
import { AuthUser} from "@/common/interfaces/auth-user.interface";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@Controller("user-profile-contacts")
export class UserProfileContactController {
    constructor(
        private readonly userProfileContactService: UserProfileContactService,
    ) {}

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @Get()
    async getUserProfileContacts() {
        return await this.userProfileContactService.getUserProfileContacts();
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @Get(":id")
    async getUserProfileContactById(@Param("id") id: string) {
        return await this.userProfileContactService.getUserProfileContactById(id);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @Post()
    async createUserProfileContact(@CurrentUser() user: AuthUser,@Body() dto: CreateUserProfileContactDto) {
        return await this.userProfileContactService.createUserProfileContact(dto, user);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)   
    @Patch(":id")
    async updateUserProfileContact(@Param("id") id: string, @CurrentUser() user: AuthUser, @Body() dto: UpdateUserProfileContactDto,) {
        return await this.userProfileContactService.updateUserProfileContact(id, dto, user);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @Delete(":id")
    async deleteUserProfileContact(@Param("id") id: string, @CurrentUser() user: AuthUser) {
        return await this.userProfileContactService.deleteUserProfileContact(id, user);
    }
}