import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollabPostRequiredSkillController } from "./collab_post_required_skill.controller";
import { CollabPostRequiredSkillService } from "./collab_post_required_skill.service";
import { CollabPostRequiredSkill } from "./entities/collab_post_required_skill.entity";
import { CollabPost } from "../collab_post/entities/collab_post.entity";
import { Skill } from "../skill/entities/skill.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([CollabPostRequiredSkill, CollabPost, Skill]),
    ],
    controllers: [CollabPostRequiredSkillController],
    providers: [CollabPostRequiredSkillService],
    exports: [CollabPostRequiredSkillService],
})
export class CollabPostRequiredSkillModule {}