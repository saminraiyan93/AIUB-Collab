import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CollabPostPreferredInterest } from "./entities/collab_post_preferred_interest.entity";
import { CollabPost } from "../collab_post/entities/collab_post.entity";
import { Interest } from "../interest/entities/interest.entity";
import {
    CreateCollabPostPreferredInterestDto,
    UpdateCollabPostPreferredInterestDto,
} from "./dto/collab_post_preferred_interest.dto";

@Injectable()
export class CollabPostPreferredInterestService {
    constructor(
        @InjectRepository(CollabPostPreferredInterest)
        private readonly collabPostPreferredInterestRepository:
            Repository<CollabPostPreferredInterest>,
    ) {}

    async getCollabPostPreferredInterests() {
        try {
            return await this.collabPostPreferredInterestRepository.find({
                relations: ["collab_post", "interest"],
            });
        } catch (error) {
            throw error;
        }
    }

    async getCollabPostPreferredInterestById(id: string) {
        try {
            const preferredInterest =
                await this.collabPostPreferredInterestRepository.findOne({
                    where: { post_preferred_interest_id: id },
                    relations: ["collab_post", "interest"],
                });

            if (!preferredInterest) {
                throw new NotFoundException("Preferred interest not found");
            }

            return preferredInterest;
        } catch (error) {
            throw error;
        }
    }

    async createCollabPostPreferredInterest(
        dto: CreateCollabPostPreferredInterestDto,
    ) {
        try {
            const preferredInterest =
                this.collabPostPreferredInterestRepository.create({
                    collab_post_id: dto.collab_post_id,
                    collab_post: {
                        collab_post_id: dto.collab_post_id,
                    } as CollabPost,
                    interest_id: dto.interest_id,
                    interest: {
                        interest_id: dto.interest_id,
                    } as Interest,
                });

            const savedPreferredInterest =
                await this.collabPostPreferredInterestRepository.save(
                    preferredInterest,
                );

            return await this.getCollabPostPreferredInterestById(
                savedPreferredInterest.post_preferred_interest_id,
            );
        } catch (error) {
            throw error;
        }
    }

    async updateCollabPostPreferredInterest(
        id: string,
        dto: UpdateCollabPostPreferredInterestDto,
    ) {
        try {
            const preferredInterest =
                await this.collabPostPreferredInterestRepository.findOne({
                    where: { post_preferred_interest_id: id },
                });

            if (!preferredInterest) {
                throw new NotFoundException("Preferred interest not found");
            }

            if (dto.collab_post_id !== undefined) {
                preferredInterest.collab_post_id = dto.collab_post_id;
                preferredInterest.collab_post = {
                    collab_post_id: dto.collab_post_id,
                } as CollabPost;
            }

            if (dto.interest_id !== undefined) {
                preferredInterest.interest_id = dto.interest_id;
                preferredInterest.interest = {
                    interest_id: dto.interest_id,
                } as Interest;
            }

            await this.collabPostPreferredInterestRepository.save(
                preferredInterest,
            );

            return await this.getCollabPostPreferredInterestById(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteCollabPostPreferredInterest(id: string) {
        try {
            await this.getCollabPostPreferredInterestById(id);

            return await this.collabPostPreferredInterestRepository.delete({
                post_preferred_interest_id: id,
            });
        } catch (error) {
            throw error;
        }
    }
}