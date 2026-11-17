import {Body, Controller, Delete, Get, Param, Patch, Post,} from "@nestjs/common";
import { CollabPostService } from "./collab_post.service";
import {CreateCollabPostDto, UpdateCollabPostDto} from "./dto/collab_post.dto";

@Controller("collab-posts")
export class CollabPostController {
    constructor(
        private readonly collabPostService: CollabPostService,
    ) {}

    @Get()
    async getCollabPosts() {
        return await this.collabPostService.getCollabPosts();
    }

    @Get(":id")
    async getCollabPostById(@Param("id") id: string) {
        return await this.collabPostService.getCollabPostById(id);
    }

    @Post()
    async createCollabPost(@Body() dto: CreateCollabPostDto) {
        return await this.collabPostService.createCollabPost(dto);
    }

    @Patch(":id")
    async updateCollabPost(@Param("id") id: string, @Body() dto: UpdateCollabPostDto) {
        return await this.collabPostService.updateCollabPost(id, dto);
    }

    @Delete(":id")
    async deleteCollabPost(@Param("id") id: string) {
        return await this.collabPostService.deleteCollabPost(id);
    }
}