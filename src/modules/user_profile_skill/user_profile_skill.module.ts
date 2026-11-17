import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Skill } from "../skill/entities/skill.entity";
import { UserProfile } from "../user_profile/entities/user_profile.entity";
import { UserProfileSkillController } from "./user_profile_skill.controller";
import { UserProfileSkillService } from "./user_profile_skill.service";
import { UserProfileSkill } from "./entities/user_profile_skill.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserProfileSkill, UserProfile, Skill])],
    controllers: [UserProfileSkillController],
    providers: [UserProfileSkillService],
    exports: [UserProfileSkillService],
})
export class UserProfileSkillModule {}