import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollabPostPreferredInterestController } from "./collab_post_preferred_interest.controller";
import { CollabPostPreferredInterestService } from "./collab_post_preferred_interest.service";
import { CollabPostPreferredInterest } from "./entities/collab_post_preferred_interest.entity";
import { CollabPost } from "../collab_post/entities/collab_post.entity";
import { Interest } from "../interest/entities/interest.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CollabPostPreferredInterest,
            CollabPost,
            Interest,
        ]),
    ],
    controllers: [CollabPostPreferredInterestController],
    providers: [CollabPostPreferredInterestService],
    exports: [CollabPostPreferredInterestService],
})
export class CollabPostPreferredInterestModule {}