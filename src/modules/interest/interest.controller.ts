import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import{InterestService} from "./interest.service";
import { CreateInterestDto, UpdateInterestDto } from "./dto/interest.dto";

@Controller("interests")
export class InterestController {

    constructor(private readonly interestService: InterestService) {}

    @Get()
    async getInterests() {
        return await this.interestService.getInterests();
    }

    @Get(":id")
    async getInterestsById(@Param("id") id: string) {
        return await this.interestService.getInterestsById(id);
    }

    @Post()
        async createInterest(@Body() dto: CreateInterestDto) {
            return await this.interestService.createInterest(dto);
    }
    
    @Patch(":id")
        async updateInterest(@Param("id") id: string, @Body() dto: UpdateInterestDto) {
            return await this.interestService.updateInterest(id, dto);
    }

    @Delete(":id")
        async deleteInterest(@Param("id") id: string) {
            return await this.interestService.deleteInterest(id);
    }

}