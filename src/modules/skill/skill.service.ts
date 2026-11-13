import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "./entities/skill.entity";
import { Repository } from "typeorm";
import { CreateSkillDto, UpdateSkillDto } from "./dto/skill.dto";

@Injectable()
export class SkillService {
    constructor
        (@InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
        ) { }

    async getSkills() {

        try {
            const skills = await this.skillRepository.find();
            return skills;
        }
        catch (error) {
            throw error;
        }
    }

    async getSkillsById(id: string) {
        try {
            const skill = await this.skillRepository.findOne(
                { where: { skill_id: id } }
            );

            if (!skill) {
                throw new NotFoundException("Skill not found!");
            }

            return skill;
        } catch (error) {
            throw error;
        }
    }

    async createSkill(dto: CreateSkillDto) {
        try {
            const responce = await this.skillRepository.create(dto);
            return await this.skillRepository.save(responce);
        }
        catch (error) {
            throw error;
        }
    }

    async updateSkill(id: string, dto: UpdateSkillDto) {
        try {
            console.log("id", id);
            if (!id) {
                throw new NotFoundException("Skill not found");
            }
            const skill = await this.skillRepository.findOne(
                {
                    where: {
                        skill_id: id,
                    },
                });
            if (!skill) {
                throw new NotFoundException("Skill not found");
            }
            Object.assign(skill, dto);
            const { skill_id, ...rest } = skill;
            return await this.skillRepository.update({ skill_id: id }, rest);
        } catch (error) {
            throw error;
        }
    }

    async deleteSkill(id: string) {
        try {
            const skill = await this.skillRepository.findOne({
                where: {
                    skill_id: id,
                },
            });
            if (!skill) {
                throw new NotFoundException("Skill not found");
            }
            return await this.skillRepository.delete({ skill_id: id });
        } catch (error) {
            throw error;
        }
    }
}