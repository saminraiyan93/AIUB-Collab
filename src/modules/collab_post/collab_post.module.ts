import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollabPostController } from "./collab_post.controller";
import { CollabPostService } from "./collab_post.service";
import { CollabPost } from "./entities/collab_post.entity";
import { UserProfile } from "../user_profile/entities/user_profile.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CollabPost,UserProfile])],
    controllers: [CollabPostController],
    providers: [CollabPostService],
    exports: [CollabPostService],
})
export class CollabPostModule {}