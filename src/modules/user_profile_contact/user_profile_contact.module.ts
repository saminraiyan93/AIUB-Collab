import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "../user_profile/entities/user_profile.entity";
import { UserProfileContactController } from "./user_profile_contact.controller";
import { UserProfileContactService } from "./user_profile_contact.service";
import { UserProfileContact } from "./entities/user_profile_contact.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserProfileContact, UserProfile]),
    ],
    controllers: [UserProfileContactController],
    providers: [UserProfileContactService],
    exports: [UserProfileContactService],
})
export class UserProfileContactModule {}