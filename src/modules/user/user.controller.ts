import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "../../common/guard/jwt.guard";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";

@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get("me")
    @UseGuards(JwtGuard)
    async getCurrentUser(@Req() req: { user: { id: string } }) {
        return await this.userService.getCurrentUser(req.user.id);
    }

    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(":id")
    async getUsersById(@Param("id") id: string) {
        return await this.userService.getUsersById(id);
    }

    @Post()
        async createUser(@Body() dto: CreateUserDto) {
            return await this.userService.createUser(dto);
    }
    
    @Patch(":id")
        async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
            return await this.userService.updateUser(id, dto);
    }

    @Delete(":id")
        async deleteUser(@Param("id") id: string) {
            return await this.userService.deleteUser(id);
    }

}