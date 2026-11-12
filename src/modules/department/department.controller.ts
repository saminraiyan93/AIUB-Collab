import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import{DepartmentService} from "./department.service";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./dto/department.dto";

@Controller("departments")
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService) {}

    @Get()
    async getDepartments() {
        return await this.departmentService.getDepartments();
    }

    @Get(":id")
    async getDepartmentsById(@Param("id") id: string) {
        return await this.departmentService.getDepartmentsById(id);
    }

    @Post()
        async createDepartment(@Body() dto: CreateDepartmentDto) {
            return await this.departmentService.createDepartment(dto);
    }
    
    @Patch(":id")
        async updateDepartment(@Param("id") id: string, @Body() dto: UpdateDepartmentDto) {
            return await this.departmentService.updateDepartment(id, dto);
    }

    @Delete(":id")
        async deleteDepartment(@Param("id") id: string) {
            return await this.departmentService.deleteDepartment(id);
    }

}