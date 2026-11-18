import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import { CollabPostService } from "./collab_post.service";
import {CreateCollabPostDto, UpdateCollabPostDto} from "./dto/collab_post.dto";
import {JwtGuard} from "@/common/guard/jwt.guard";
import {RolesGuard} from "@/common/guard/roles.guard";
import {Roles} from "@/common/decorators/user-role.decorator";
import {UserRole} from "@/common/enums/user-role.enum";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiTags("Collaboration Posts")
@ApiBearerAuth()

@Controller("collab-posts")
export class CollabPostController {
    constructor(
        private readonly collabPostService: CollabPostService,
    ) {}

    @ApiOperation({
        summary: "Get all collaboration posts",
        description: "Returns collaboration posts and their user profile relation.",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @Get()
    @UseGuards(JwtGuard)
    async getCollabPosts() {
        return await this.collabPostService.getCollabPosts();
    }

    @ApiOperation({
        summary: "Get a collaboration post by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the collaboration post",
        example: "550e8400-e29b-41d4-a716-446655440002",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiNotFoundResponse({
        description: "Collaboration post not found",
    })
    @Get(":id")
    @UseGuards(JwtGuard)
    async getCollabPostById(@Param("id") id: string) {
        return await this.collabPostService.getCollabPostById(id);
    }

    @ApiOperation({
        summary: "Create a new collaboration post",
        description: "Creates a post after validating the future deadline and profile-owned contact.",
    })
    @ApiBadRequestResponse({
        description: "Invalid DTO data, past deadline, or contact/profile mismatch",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiNotFoundResponse({
        description: "Post contact not found",
    })
    @Post()
    @UseGuards(JwtGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async createCollabPost(@Body() dto: CreateCollabPostDto) {
        return await this.collabPostService.createCollabPost(dto);
    }

    @ApiOperation({
        summary: "Update a collaboration post",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the collaboration post",
        example: "550e8400-e29b-41d4-a716-446655440002",
    })
    @ApiBadRequestResponse({
        description: "Invalid update data or past deadline",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "User role is not permitted",
    })
    @ApiNotFoundResponse({
        description: "Collaboration post or post contact not found",
    })
    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async updateCollabPost(@Param("id") id: string, @Body() dto: UpdateCollabPostDto) {
        return await this.collabPostService.updateCollabPost(id, dto);
    }

    @ApiOperation({
        summary: "Delete a collaboration post",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the collaboration post",
        example: "550e8400-e29b-41d4-a716-446655440002",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "User role is not permitted",
    })
    @ApiNotFoundResponse({
        description: "Collaboration post not found",
    })
    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteCollabPost(@Param("id") id: string) {
        return await this.collabPostService.deleteCollabPost(id);
    }
}