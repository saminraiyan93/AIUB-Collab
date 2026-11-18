import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { CollabPostPreferredInterestService } from "./collab_post_preferred_interest.service";
import {
    CreateCollabPostPreferredInterestDto,
    UpdateCollabPostPreferredInterestDto,
} from "./dto/collab_post_preferred_interest.dto";

@Controller("collab-post-preferred-interests")
export class CollabPostPreferredInterestController {
    constructor(
        private readonly collabPostPreferredInterestService:
            CollabPostPreferredInterestService,
    ) {}

    @Get()
    async getCollabPostPreferredInterests() {
        return await this.collabPostPreferredInterestService
            .getCollabPostPreferredInterests();
    }

    @Get(":id")
    async getCollabPostPreferredInterestById(@Param("id") id: string) {
        return await this.collabPostPreferredInterestService
            .getCollabPostPreferredInterestById(id);
    }

    @Post()
    async createCollabPostPreferredInterest(
        @Body() dto: CreateCollabPostPreferredInterestDto,
    ) {
        return await this.collabPostPreferredInterestService
            .createCollabPostPreferredInterest(dto);
    }

    @Patch(":id")
    async updateCollabPostPreferredInterest(
        @Param("id") id: string,
        @Body() dto: UpdateCollabPostPreferredInterestDto,
    ) {
        return await this.collabPostPreferredInterestService
            .updateCollabPostPreferredInterest(id, dto);
    }

    @Delete(":id")
    async deleteCollabPostPreferredInterest(@Param("id") id: string) {
        return await this.collabPostPreferredInterestService
            .deleteCollabPostPreferredInterest(id);
    }
}