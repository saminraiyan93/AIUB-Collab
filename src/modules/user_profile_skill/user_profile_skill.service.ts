import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserProfileSkill } from "./entities/user_profile_skill.entity";
import {
    CreateUserProfileSkillDto,
    UpdateUserProfileSkillDto,
} from "./dto/user_profile_skill.dto";

@Injectable()
export class UserProfileSkillService {
    constructor(
        @InjectRepository(UserProfileSkill)
        private readonly userProfileSkillRepository: Repository<UserProfileSkill>,
    ) {}

    async getUserProfileSkills() {
        try {
            const userProfileSkills = await this.userProfileSkillRepository.find({
                relations: ["user_profile", "skill"],
            });
            return userProfileSkills;
        }
        catch (error) {
            throw error;
        }
    }

    async getUserProfileSkillById(id: string) {
        try {
            const userProfileSkill = await this.userProfileSkillRepository.findOne({
                where: { user_profile_skill_id: id },
                relations: ["user_profile", "skill"],
            });

            if (!userProfileSkill) {
                throw new NotFoundException("User profile skill not found");
            }

            return userProfileSkill;
        } catch (error) {
            throw error;
        }
    }

    async createUserProfileSkill(dto: CreateUserProfileSkillDto) {
        try {
            const responce = await this.userProfileSkillRepository.create(dto);
            return await this.userProfileSkillRepository.save(responce);
        }
        catch (error) {
            throw error;
        }
    }

    async updateUserProfileSkill(id: string, dto: UpdateUserProfileSkillDto) {
        try {
            console.log("id", id);
            if (!id) {
                throw new NotFoundException("User profile skill not found");
            }
            const userProfileSkill = await this.userProfileSkillRepository.findOne(
                {
                    where: {
                        user_profile_skill_id: id,
                    },
                });
            if (!userProfileSkill) {
                throw new NotFoundException("User profile skill not found");
            }
            Object.assign(userProfileSkill, dto);
            const { user_profile_skill_id, ...rest } = userProfileSkill;
            return await this.userProfileSkillRepository.update({ user_profile_skill_id: id }, rest);
        } catch (error) {
            throw error;
        }
    }

    async deleteUserProfileSkill(id: string) {
        try {
            const userProfileSkill = await this.userProfileSkillRepository.findOne({
                where: {
                    user_profile_skill_id: id,
                },
            });
            if (!userProfileSkill) {
                throw new NotFoundException("User profile skill not found");
            }
            return await this.userProfileSkillRepository.delete({ user_profile_skill_id: id });
        } catch (error) {
            throw error;
        }
    }
}