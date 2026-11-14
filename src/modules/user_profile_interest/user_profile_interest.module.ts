import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Interest } from "../interest/entities/interest.entity";
import { UserProfile } from "../user_profile/entities/user_profile.entity";
import { UserProfileInterestController } from "./user_profile_interest.controller";
import { UserProfileInterestService } from "./user_profile_interest.service";
import { UserProfileInterest } from "./entities/user_profile_interest.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserProfileInterest, UserProfile, Interest])],
    controllers: [UserProfileInterestController],
    providers: [UserProfileInterestService],
    exports: [UserProfileInterestService],
})
export class UserProfileInterestModule {}