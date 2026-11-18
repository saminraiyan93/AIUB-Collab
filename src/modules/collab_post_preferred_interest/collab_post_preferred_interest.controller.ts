import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { CollabPostPreferredInterestService } from "@/modules/collab_post_preferred_interest/collab_post_preferred_interest.service";
import {
    CreateCollabPostPreferredInterestDto,
    UpdateCollabPostPreferredInterestDto,
} from "@/modules/collab_post_preferred_interest/dto/collab_post_preferred_interest.dto";

@Controller("collab-post-preferred-interests")
export class CollabPostPreferredInterestController {
    constructor(
        private readonly collabPostPreferredInterestService:
            CollabPostPreferredInterestService,
    ) {}

    @Get()
    getCollabPostPreferredInterests() {
        return this.collabPostPreferredInterestService
            .getCollabPostPreferredInterests();
    }

    @Get(":id")
    getCollabPostPreferredInterestById(@Param("id") id: string) {
        return this.collabPostPreferredInterestService
            .getCollabPostPreferredInterestById(id);
    }

    @Post()
    createCollabPostPreferredInterest(
        @Body() dto: CreateCollabPostPreferredInterestDto,
    ) {
        return this.collabPostPreferredInterestService
            .createCollabPostPreferredInterest(dto);
    }

    @Patch(":id")
    updateCollabPostPreferredInterest(
        @Param("id") id: string,
        @Body() dto: UpdateCollabPostPreferredInterestDto,
    ) {
        return this.collabPostPreferredInterestService
            .updateCollabPostPreferredInterest(id, dto);
    }

    @Delete(":id")
    deleteCollabPostPreferredInterest(@Param("id") id: string) {
        return this.collabPostPreferredInterestService
            .deleteCollabPostPreferredInterest(id);
    }
}