import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CollabPostRequiredSkill } from "./entities/collab_post_required_skill.entity";
import { CollabPost } from "../collab_post/entities/collab_post.entity";
import { Skill } from "../skill/entities/skill.entity";
import {
    CreateCollabPostRequiredSkillDto,
    UpdateCollabPostRequiredSkillDto,
} from "./dto/collab_post_required_skill.dto";

@Injectable()
export class CollabPostRequiredSkillService {
    constructor(
        @InjectRepository(CollabPostRequiredSkill)
        private readonly collabPostRequiredSkillRepository: Repository<CollabPostRequiredSkill>,
    ) {}

    async getCollabPostRequiredSkills() {
        return await this.collabPostRequiredSkillRepository.find({
            relations: ["collab_post", "skill"],
        });
    }

    async getCollabPostRequiredSkillById(id: string) {
        const requiredSkill =
            await this.collabPostRequiredSkillRepository.findOne({
                where: { post_required_skill_id: id },
                relations: ["collab_post", "skill"],
            });

        if (!requiredSkill) {
            throw new NotFoundException("Required skill not found.");
        }

        return requiredSkill;
    }

    async createCollabPostRequiredSkill(
        dto: CreateCollabPostRequiredSkillDto,
    ) {
        const requiredSkill =
            this.collabPostRequiredSkillRepository.create({
                collab_post_id: dto.collab_post_id,
                collab_post: {
                    collab_post_id: dto.collab_post_id,
                } as CollabPost,
                skill_id: dto.skill_id,
                skill: {
                    skill_id: dto.skill_id,
                } as Skill,
            });

        const savedRequiredSkill =
            await this.collabPostRequiredSkillRepository.save(requiredSkill);

        return {
            message: "Required skill created successfully.",
            data: savedRequiredSkill,
        };
    }

    async updateCollabPostRequiredSkill(
        id: string,
        dto: UpdateCollabPostRequiredSkillDto,
    ) {
        const requiredSkill = await this.getCollabPostRequiredSkillById(id);

        Object.assign(requiredSkill, dto);

        await this.collabPostRequiredSkillRepository.save(requiredSkill);

        return {
            message: "Required skill updated successfully.",
            data: await this.getCollabPostRequiredSkillById(id),
        };
    }

    async deleteCollabPostRequiredSkill(id: string) {
        await this.getCollabPostRequiredSkillById(id);

        const deleteResult =
            await this.collabPostRequiredSkillRepository.delete({
                post_required_skill_id: id,
            });

        return {
            message: "Required skill deleted successfully.",
            data: deleteResult,
        };
    }
}