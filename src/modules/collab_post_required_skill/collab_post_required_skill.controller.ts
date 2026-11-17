import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { CollabPostRequiredSkillService } from "./collab_post_required_skill.service";
import {
    CreateCollabPostRequiredSkillDto,
    UpdateCollabPostRequiredSkillDto,
} from "./dto/collab_post_required_skill.dto";

@Controller("collab-post-required-skills")
export class CollabPostRequiredSkillController {
    constructor(
        private readonly collabPostRequiredSkillService: CollabPostRequiredSkillService,
    ) {}

    @Get()
    async getCollabPostRequiredSkills() {
        return await this.collabPostRequiredSkillService
            .getCollabPostRequiredSkills();
    }

    @Get(":id")
    async getCollabPostRequiredSkillById(@Param("id") id: string) {
        return await this.collabPostRequiredSkillService
            .getCollabPostRequiredSkillById(id);
    }

@Post()
@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
}))
async createCollabPostRequiredSkill(
    @Body() dto: CreateCollabPostRequiredSkillDto,
) {
    return await this.collabPostRequiredSkillService
        .createCollabPostRequiredSkill(dto);
}

    @Patch(":id")
    async updateCollabPostRequiredSkill(
        @Param("id") id: string,
        @Body() dto: UpdateCollabPostRequiredSkillDto,
    ) {
        return await this.collabPostRequiredSkillService
            .updateCollabPostRequiredSkill(id, dto);
    }

    @Delete(":id")
    async deleteCollabPostRequiredSkill(@Param("id") id: string) {
        return await this.collabPostRequiredSkillService
            .deleteCollabPostRequiredSkill(id);
    }
}