import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserLinkedProfileController } from "./user_linked_profile.controller";
import { UserLinkedProfileService } from "./user_linked_profile.service";
import { UserLinkedProfile } from "./entities/user_linked_profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserLinkedProfile])],
  controllers: [UserLinkedProfileController],
  providers: [UserLinkedProfileService],
  exports: [UserLinkedProfileService],
})
export class UserLinkedProfileModule {}