import {BadRequestException, ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApplicationStatus } from "../../common/enums/application-status.enum";
import { PostStatus } from "../../common/enums/post-status.enum";
import { CollabPost } from "./entities/collab_post.entity";
import { CollabApplication } from "../collab_application/entities/collab_application.entity";
import { UserProfileContact } from "../user_profile_contact/entities/user_profile_contact.entity";
import {CreateCollabPostDto,UpdateCollabPostDto} from "./dto/collab_post.dto";


@Injectable()
export class CollabPostService {
    constructor(
        @InjectRepository(CollabPost)
        private readonly collabPostRepository: Repository<CollabPost>,
        @InjectRepository(UserProfileContact)
        private readonly contactRepository: Repository<UserProfileContact>,
        @InjectRepository(CollabApplication)
        private readonly applicationRepository: Repository<CollabApplication>,
    ) {}

    async getCollabPosts() {
        return this.collabPostRepository.find({
            relations: ["user_profile"],
        });
    }

    async getCollabPostById(id: string) {
        const collabPost = await this.collabPostRepository.findOne({
            where: { collab_post_id: id },
            relations: ["user_profile"],
        });

        if (!collabPost) {
            throw new NotFoundException("Collaboration post not found");
        }

        return collabPost;
    }

    async createCollabPost(dto: CreateCollabPostDto) {
        this.validateFutureDeadline(dto.application_deadline);

        await this.validatePostContact(
            dto.post_contact_id,
            dto.user_profile_id,
        );

        const collabPost = this.collabPostRepository.create({
            ...dto,
            application_deadline: new Date(dto.application_deadline),
            user_profile: {
                user_profile_id: dto.user_profile_id,
            },
            post_status: PostStatus.PENDING,
        });

        const savedPost =
            await this.collabPostRepository.save(collabPost);

        return {
            message: "Collaboration post created successfully.",
            data: savedPost,
        };
    }

    async updateCollabPost(id: string, dto: UpdateCollabPostDto) {
        const collabPost = await this.getCollabPostById(id);

        if (dto.application_deadline) {
            this.validateFutureDeadline(dto.application_deadline);
        }

        if (dto.post_contact_id) {
            await this.validatePostContact(
                dto.post_contact_id,
                collabPost.user_profile_id,
            );
        }

        if (dto.collaborators_needed !== undefined) {
            await this.validateCollaboratorsNeeded(
                id,
                dto.collaborators_needed,
            );

            if (dto.collaborators_needed === 0) {
                dto.post_status = PostStatus.CLOSED;
            }
        }

        Object.assign(collabPost, dto);

        collabPost.updated_at = new Date();

        if (collabPost.collaborators_needed === 0) {
            collabPost.post_status = PostStatus.CLOSED;
        }

        const savedPost =
            await this.collabPostRepository.save(collabPost);

        return {
            message: "Collaboration post updated successfully.",
            data: savedPost,
        };
    }

    async deleteCollabPost(id: string) {
        await this.getCollabPostById(id);

        const deleteResult =
            await this.collabPostRepository.delete({
                collab_post_id: id,
            });

        return {
            message: "Collaboration post deleted successfully.",
            data: deleteResult,
        };
    }

    private validateFutureDeadline(applicationDeadline: string) {
        const deadline = new Date(applicationDeadline);

        if (
            Number.isNaN(deadline.getTime()) ||
            deadline.getTime() <= Date.now()
        ) {
            throw new BadRequestException(
                "application_deadline must be in the future",
            );
        }
    }

    private async validatePostContact(postContactId: string, userProfileId: string) {
        const contact = await this.contactRepository.findOne({
            where: {
                user_profile_contact_id: postContactId,
            },
        });

        if (!contact) {
            throw new NotFoundException(
                "Post contact not found",
            );
        }

        if (contact.user_profile_id !== userProfileId) {
            throw new BadRequestException(
                "post_contact_id must belong to user_profile_id",
            );
        }
    }

    private async validateCollaboratorsNeeded(postId: string, requestedCount: number) {
        if (requestedCount < 0) {
            throw new BadRequestException(
                "collaborators_needed cannot be negative",
            );
        }

        const recruitedCount =
            await this.applicationRepository.count({
                where: {
                    collab_post_id: postId,
                    application_status: ApplicationStatus.RECRUITED,
                },
            });

        if (requestedCount < recruitedCount) {
            throw new ConflictException(
                `collaborators_needed cannot be below the recruited application count (${recruitedCount})`,
            );
        }
    }
}