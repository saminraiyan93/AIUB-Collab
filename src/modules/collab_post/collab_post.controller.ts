import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import { CollabPostService } from "./collab_post.service";
import {CreateCollabPostDto, UpdateCollabPostDto} from "./dto/collab_post.dto";
import {JwtGuard} from "@/common/guard/jwt.guard";
import {RolesGuard} from "@/common/guard/roles.guard";
import {Roles} from "@/common/decorators/user-role.decorator";
import {UserRole} from "@/common/enums/user-role.enum";

@Controller("collab-posts")
export class CollabPostController {
    constructor(
        private readonly collabPostService: CollabPostService,
    ) {}

    @Get()
    @UseGuards(JwtGuard)
    async getCollabPosts() {
        return await this.collabPostService.getCollabPosts();
    }

    @Get(":id")
    @UseGuards(JwtGuard)
    async getCollabPostById(@Param("id") id: string) {
        return await this.collabPostService.getCollabPostById(id);
    }

    @Post()
    @UseGuards(JwtGuard)
    async createCollabPost(@Body() dto: CreateCollabPostDto) {
        return await this.collabPostService.createCollabPost(dto);
    }

    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async updateCollabPost(@Param("id") id: string, @Body() dto: UpdateCollabPostDto) {
        return await this.collabPostService.updateCollabPost(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteCollabPost(@Param("id") id: string) {
        return await this.collabPostService.deleteCollabPost(id);
    }
}