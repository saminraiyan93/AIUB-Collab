import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateCollabPostPreferredDepartmentDto,
  UpdateCollabPostPreferredDepartmentDto,
} from "./dto/collab_post_preferred_department.dto";
import { CollabPostPreferredDepartment } from "./entities/collab_post_preferred_department.entity";

@Injectable()
export class CollabPostPreferredDepartmentService {
  constructor(
    @InjectRepository(CollabPostPreferredDepartment)
    private readonly preferredDepartmentRepository: Repository<CollabPostPreferredDepartment>,
  ) {}

  async getCollabPostPreferredDepartments() {
    return this.preferredDepartmentRepository.find({
      relations: {
        collab_post: true,
        department: true,
      },
    });
  }

  async getCollabPostPreferredDepartmentById(id: string) {
    const preferredDepartment =
      await this.preferredDepartmentRepository.findOne({
        where: { post_preferred_department_id: id },
        relations: {
          collab_post: true,
          department: true,
        },
      });

    if (!preferredDepartment) {
      throw new NotFoundException("Preferred department not found");
    }

    return preferredDepartment;
  }

  async createCollabPostPreferredDepartment(
    dto: CreateCollabPostPreferredDepartmentDto,
  ) {
    const preferredDepartment =
      this.preferredDepartmentRepository.create(dto);

    return this.preferredDepartmentRepository.save(preferredDepartment);
  }

  async updateCollabPostPreferredDepartment(
    id: string,
    dto: UpdateCollabPostPreferredDepartmentDto,
  ) {
    const preferredDepartment =
      await this.preferredDepartmentRepository.findOne({
        where: { post_preferred_department_id: id },
      });

    if (!preferredDepartment) {
      throw new NotFoundException("Preferred department not found");
    }

    Object.assign(preferredDepartment, dto);
    return this.preferredDepartmentRepository.save(preferredDepartment);
  }

  async deleteCollabPostPreferredDepartment(id: string) {
    await this.getCollabPostPreferredDepartmentById(id);

    return this.preferredDepartmentRepository.delete({
      post_preferred_department_id: id,
    });
  }
}