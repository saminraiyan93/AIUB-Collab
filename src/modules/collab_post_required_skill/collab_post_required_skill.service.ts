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
        private readonly requiredSkillRepository: Repository<CollabPostRequiredSkill>,
        @InjectRepository(CollabPost)
        private readonly collabPostRepository: Repository<CollabPost>,
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
    ) {}

    async getCollabPostRequiredSkills() {
        return this.requiredSkillRepository.find({
            relations: {
                collab_post: true,
                skill: true,
            },
        });
    }

    async getCollabPostRequiredSkillById(id: string) {
        const requiredSkill = await this.requiredSkillRepository.findOne({
            where: { post_required_skill_id: id },
            relations: {
                collab_post: true,
                skill: true,
            },
        });

        if (!requiredSkill) {
            throw new NotFoundException("Required skill not found.");
        }

        return requiredSkill;
    }

    async createCollabPostRequiredSkill(
        dto: CreateCollabPostRequiredSkillDto,
    ) {
        const [collabPost, skill] = await Promise.all([
            this.findCollabPostOrThrow(dto.collab_post_id),
            this.findSkillOrThrow(dto.skill_id),
        ]);

        const requiredSkill = this.requiredSkillRepository.create({
            collab_post: collabPost,
            skill,
        });

        const savedRequiredSkill =
            await this.requiredSkillRepository.save(requiredSkill);

        return {
            message: "Required skill created successfully.",
            data: await this.getCollabPostRequiredSkillById(
                savedRequiredSkill.post_required_skill_id,
            ),
        };
    }

    async updateCollabPostRequiredSkill(
        id: string,
        dto: UpdateCollabPostRequiredSkillDto,
    ) {
        const requiredSkill = await this.getCollabPostRequiredSkillById(id);

        if (dto.collab_post_id !== undefined) {
            requiredSkill.collab_post = await this.findCollabPostOrThrow(
                dto.collab_post_id,
            );
        }

        if (dto.skill_id !== undefined) {
            requiredSkill.skill = await this.findSkillOrThrow(dto.skill_id);
        }

        await this.requiredSkillRepository.save(requiredSkill);

        return {
            message: "Required skill updated successfully.",
            data: await this.getCollabPostRequiredSkillById(id),
        };
    }

    async deleteCollabPostRequiredSkill(id: string) {
        await this.getCollabPostRequiredSkillById(id);

        const deleteResult = await this.requiredSkillRepository.delete({
            post_required_skill_id: id,
        });

        return {
            message: "Required skill deleted successfully.",
            data: deleteResult,
        };
    }

    private async findCollabPostOrThrow(id: string) {
        const collabPost = await this.collabPostRepository.findOneBy({
            collab_post_id: id,
        });

        if (!collabPost) {
            throw new NotFoundException("Collaboration post not found.");
        }

        return collabPost;
    }

    private async findSkillOrThrow(id: string) {
        const skill = await this.skillRepository.findOneBy({
            skill_id: id,
        });

        if (!skill) {
            throw new NotFoundException("Skill not found.");
        }

        return skill;
    }
}