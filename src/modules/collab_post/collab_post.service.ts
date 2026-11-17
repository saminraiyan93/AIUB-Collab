import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CollabPost } from "./entities/collab_post.entity";
import {CreateCollabPostDto, UpdateCollabPostDto} from "./dto/collab_post.dto";
import { PostStatus } from "../../common/enums/post-status.enum";

@Injectable()
export class CollabPostService {
    constructor(
        @InjectRepository(CollabPost)
        private readonly collabPostRepository: Repository<CollabPost>,
    ) {}

    async getCollabPosts() {
        return await this.collabPostRepository.find({relations: ["user_profile"]});
    }

    async getCollabPostById(id: string) {
        const collabPost = await this.collabPostRepository.findOne({
            where: {collab_post_id: id,},
            relations: ["user_profile"],
            });

        if (!collabPost) {
            throw new NotFoundException("Collab post not found");
        }
        return collabPost;
    }

    async createCollabPost(dto: CreateCollabPostDto) {
        const collabPost = this.collabPostRepository.create({
            ...dto,
            user_profile: {user_profile_id: dto.user_profile_id,},
            post_status: PostStatus.PENDING,
            });

        const savedCollabPost = await this.collabPostRepository.save(collabPost);
        return {
            message: "Collaboration Post Successful.",
            data: savedCollabPost,
        };
    }

    async updateCollabPost(id: string, dto: UpdateCollabPostDto) {
        const collabPost = await this.getCollabPostById(id);

        Object.assign(collabPost, dto);
        collabPost.updated_at = new Date();

        const savedCollabPost = await this.collabPostRepository.save(collabPost);

        return {
            message: "Collaboration Post Update Successful.",
            data: savedCollabPost,
        };
    }

    async deleteCollabPost(id: string) {
        await this.getCollabPostById(id);
        
        const deleteResult = await this.collabPostRepository.delete({collab_post_id: id});
        
        return {
            message: "Collaboration Post Deletion Successful.",
            data: deleteResult
        };
    }
}