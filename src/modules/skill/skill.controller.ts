import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import{SkillService} from "./skill.service";
import { CreateSkillDto, UpdateSkillDto } from "./dto/skill.dto";

@Controller("skills")
export class SkillController {

    constructor(private readonly skillService: SkillService) {}

    @Get()
    async getSkills() {
        return await this.skillService.getSkills();
    }

    @Get(":id")
    async getSkillsById(@Param("id") id: string) {
        return await this.skillService.getSkillsById(id);
    }

    @Post()
        async createSkill(@Body() dto: CreateSkillDto) {
            return await this.skillService.createSkill(dto);
    }
    
    @Patch(":id")
        async updateSkill(@Param("id") id: string, @Body() dto: UpdateSkillDto) {
            return await this.skillService.updateSkill(id, dto);
    }

    @Delete(":id")
        async deleteSkill(@Param("id") id: string) {
            return await this.skillService.deleteSkill(id);
    }

}