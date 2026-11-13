import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./entities/department.entity";
import { Repository } from "typeorm";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./dto/department.dto";

@Injectable()
export class DepartmentService {
    constructor
        (@InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
        ) { }

    async getDepartments() {

        try {
            const departments = await this.departmentRepository.find();
            return departments;
        }
        catch (error) {
            throw error;
        }
    }

    async getDepartmentsById(id: string) {
        try {
            const department = await this.departmentRepository.findOne(
                { where: { department_id: id } }
            );

            if (!department) {
                throw new NotFoundException("Department not found!");
            }

            return department;
        } catch (error) {
            throw error;
        }
    }

    async createDepartment(dto: CreateDepartmentDto) {
        try {
            const responce = await this.departmentRepository.create(dto);
            return await this.departmentRepository.save(responce);
        }
        catch (error) {
            throw error;
        }
    }

    async updateDepartment(id: string, dto: UpdateDepartmentDto) {
        try {
            console.log("id", id);
            if (!id) {
                throw new NotFoundException("Department not found");
            }
            const department = await this.departmentRepository.findOne(
                {
                    where: {
                        department_id: id,
                    },
                });
            if (!department) {
                throw new NotFoundException("Department not found");
            }
            Object.assign(department, dto);
            const { department_id, ...rest } = department;
            return await this.departmentRepository.update({ department_id: id }, rest);
        } catch (error) {
            throw error;
        }
    }

    async deleteDepartment(id: string) {
        try {
            const department = await this.departmentRepository.findOne({
                where: {
                    department_id: id,
                },
            });
            if (!department) {
                throw new NotFoundException("Department not found");
            }
            return await this.departmentRepository.delete({ department_id: id });
        } catch (error) {
            throw error;
        }
    }
}