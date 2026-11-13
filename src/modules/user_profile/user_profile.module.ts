import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfileController } from "./user_profile.controller";
import { UserProfileService } from "./user_profile.service";
import { UserProfile } from "./entities/user_profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
    exports: [UserProfileService],
})
export class UserProfileModule {}