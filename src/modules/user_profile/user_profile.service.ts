import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfile } from "./entities/user_profile.entity";
import { Repository } from "typeorm";
import { CreateUserProfileDto, UpdateUserProfileDto } from "./dto/user_profile.dto";

@Injectable()
export class UserProfileService {
    constructor
        (@InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>,
        ) { }

    async getUserProfiles() {

        try {
            const userProfiles = await this.userProfileRepository.find({
                relations: {
                    department: true,
                    user: true,
                    user_profile_skills: {
                        skill: true,
                    },
                },
            });
            return userProfiles;
        }
        catch (error) {
            throw error;
        }
    }

    async getUserProfilesById(id: string) {
        try {
            const userProfile = await this.userProfileRepository.findOne(
                {
                    where: { user_profile_id: id },
                    relations: {
                        department: true,
                        user: true,
                        user_profile_skills: {
                            skill: true,
                        },
                    },
                }
            );

            if (!userProfile) {
                throw new NotFoundException("User profile not found!");
            }

            return userProfile;
        } catch (error) {
            throw error;
        }
    }

    async createUserProfile(dto: CreateUserProfileDto) {
        try {
            const responce = await this.userProfileRepository.create(dto);
            return await this.userProfileRepository.save(responce);
        }
        catch (error) {
            throw error;
        }
    }

    async updateUserProfile(id: string, dto: UpdateUserProfileDto) {
        try {
            console.log("id", id);
            if (!id) {
                throw new NotFoundException("User profile not found");
            }
            const userProfile = await this.userProfileRepository.findOne(
                {
                    where: {
                        user_profile_id: id,
                    },
                });
            if (!userProfile) {
                throw new NotFoundException("User profile not found");
            }
            Object.assign(userProfile, dto);
            const { user_profile_id, ...rest } = userProfile;
            return await this.userProfileRepository.update({ user_profile_id: id }, rest);
        } catch (error) {
            throw error;
        }
    }

    async deleteUserProfile(id: string) {
        try {
            const userProfile = await this.userProfileRepository.findOne({
                where: {
                    user_profile_id: id,
                },
            });
            if (!userProfile) {
                throw new NotFoundException("User profile not found");
            }
            return await this.userProfileRepository.delete({ user_profile_id: id });
        } catch (error) {
            throw error;
        }
    }
}