import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollabPostController } from "./collab_post.controller";
import { CollabPostService } from "./collab_post.service";
import { CollabPost } from "./entities/collab_post.entity";
import { UserProfile } from "../user_profile/entities/user_profile.entity";
import { CollabApplication } from "../collab_application/entities/collab_application.entity";
import { UserProfileContact } from "../user_profile_contact/entities/user_profile_contact.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CollabPost,UserProfile,CollabApplication,UserProfileContact])],
    controllers: [CollabPostController],
    providers: [CollabPostService],
    exports: [CollabPostService],
})
export class CollabPostModule {}