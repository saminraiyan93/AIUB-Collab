import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CollabPostPreferredInterest } from "@/modules/collab_post_preferred_interest/entities/collab_post_preferred_interest.entity";
import {
    CreateCollabPostPreferredInterestDto,
    UpdateCollabPostPreferredInterestDto,
} from "@/modules/collab_post_preferred_interest/dto/collab_post_preferred_interest.dto";

@Injectable()
export class CollabPostPreferredInterestService {
    constructor(
        @InjectRepository(CollabPostPreferredInterest)
        private readonly collabPostPreferredInterestRepository:
            Repository<CollabPostPreferredInterest>,
    ) {}

    async getCollabPostPreferredInterests() {
        return this.collabPostPreferredInterestRepository.find({
            relations: {
                collab_post: true,
                interest: true,
            },
        });
    }

    async getCollabPostPreferredInterestById(id: string) {
        const preferredInterest =
            await this.collabPostPreferredInterestRepository.findOne({
                where: { post_preferred_interest_id: id },
                relations: {
                    collab_post: true,
                    interest: true,
                },
            });

        if (!preferredInterest) {
            throw new NotFoundException("Preferred interest not found");
        }

        return preferredInterest;
    }

    async createCollabPostPreferredInterest(
        dto: CreateCollabPostPreferredInterestDto,
    ) {
        const preferredInterest =
            this.collabPostPreferredInterestRepository.create({
                collab_post_id: dto.collab_post_id,
                collab_post: {
                    collab_post_id: dto.collab_post_id,
                },
                interest_id: dto.interest_id,
                interest: {
                    interest_id: dto.interest_id,
                },
            });

        const savedPreferredInterest =
            await this.collabPostPreferredInterestRepository.save(
                preferredInterest,
            );

        return this.getCollabPostPreferredInterestById(
            savedPreferredInterest.post_preferred_interest_id,
        );
    }

    async updateCollabPostPreferredInterest(
        id: string,
        dto: UpdateCollabPostPreferredInterestDto,
    ) {
        const preferredInterest =
            await this.collabPostPreferredInterestRepository.findOne({
                where: { post_preferred_interest_id: id },
            });

        if (!preferredInterest) {
            throw new NotFoundException("Preferred interest not found");
        }

        if (dto.collab_post_id !== undefined) {
            this.collabPostPreferredInterestRepository.merge(
                preferredInterest,
                {
                    collab_post_id: dto.collab_post_id,
                    collab_post: {
                        collab_post_id: dto.collab_post_id,
                    },
                },
            );
        }

        if (dto.interest_id !== undefined) {
            this.collabPostPreferredInterestRepository.merge(
                preferredInterest,
                {
                    interest_id: dto.interest_id,
                    interest: {
                        interest_id: dto.interest_id,
                    },
                },
            );
        }

        await this.collabPostPreferredInterestRepository.save(
            preferredInterest,
        );

        return this.getCollabPostPreferredInterestById(id);
    }

    async deleteCollabPostPreferredInterest(id: string) {
        await this.getCollabPostPreferredInterestById(id);

        return this.collabPostPreferredInterestRepository.delete({
            post_preferred_interest_id: id,
        });
    }
}