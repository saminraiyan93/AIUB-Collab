import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfileInterest } from "./entities/user_profile_interest.entity";
import { Repository } from "typeorm";
import {
    CreateUserProfileInterestDto,
    UpdateUserProfileInterestDto,
} from "./dto/user_profile_interest.dto";

@Injectable()
export class UserProfileInterestService {
    constructor
        (@InjectRepository(UserProfileInterest)
        private readonly userProfileInterestRepository: Repository<UserProfileInterest>,
        ) { }

    async getUserProfileInterests() {

        try {
            const userProfileInterests = await this.userProfileInterestRepository.find({
                relations: ["user_profile", "interest"],
            });
            return userProfileInterests;
        }
        catch (error) {
            throw error;
        }
    }

    async getUserProfileInterestsById(id: string) {
        try {
            const userProfileInterest = await this.userProfileInterestRepository.findOne(
                {
                    where: { user_profile_interest_id: id },
                    relations: ["user_profile", "interest"],
                }
            );

            if (!userProfileInterest) {
                throw new NotFoundException("User profile interest not found!");
            }

            return userProfileInterest;
        } catch (error) {
            throw error;
        }
    }

    async createUserProfileInterest(dto: CreateUserProfileInterestDto) {
        try {
            const responce = await this.userProfileInterestRepository.create(dto);
            return await this.userProfileInterestRepository.save(responce);
        }
        catch (error) {
            throw error;
        }
    }

    async updateUserProfileInterest(id: string, dto: UpdateUserProfileInterestDto) {
        try {
            console.log("id", id);
            if (!id) {
                throw new NotFoundException("User profile interest not found");
            }
            const userProfileInterest = await this.userProfileInterestRepository.findOne(
                {
                    where: {
                        user_profile_interest_id: id,
                    },
                });
            if (!userProfileInterest) {
                throw new NotFoundException("User profile interest not found");
            }
            Object.assign(userProfileInterest, dto);
            const { user_profile_interest_id, ...rest } = userProfileInterest;
            return await this.userProfileInterestRepository.update({ user_profile_interest_id: id }, rest);
        } catch (error) {
            throw error;
        }
    }

    async deleteUserProfileInterest(id: string) {
        try {
            const userProfileInterest = await this.userProfileInterestRepository.findOne({
                where: {
                    user_profile_interest_id: id,
                },
            });
            if (!userProfileInterest) {
                throw new NotFoundException("User profile interest not found");
            }
            return await this.userProfileInterestRepository.delete({ user_profile_interest_id: id });
        } catch (error) {
            throw error;
        }
    }
}