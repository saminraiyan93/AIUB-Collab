import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CollabApplication } from "./entities/collab_application.entity";
import {
  CreateCollabApplicationDto,
  UpdateCollabApplicationDto,
} from "./dto/collab_application.dto";

@Injectable()
export class CollabApplicationService {
  constructor(
    @InjectRepository(CollabApplication)
    private readonly collabApplicationRepository: Repository<CollabApplication>,
  ) {}

async getCollabApplications() {
  return this.collabApplicationRepository.find({
    relations: {
      collab_post: true,
      applicant_profile: true,
      applicant_contact: true,
    },
  });
}

async getCollabApplicationById(id: string) {
  const application = await this.collabApplicationRepository.findOne({
    where: { collab_application_id: id },
    relations: {
      collab_post: true,
      applicant_profile: true,
      applicant_contact: true,
    },
  });

  if (!application) {
    throw new NotFoundException("Collaboration application not found");
  }

  return application;
}

  async createCollabApplication(dto: CreateCollabApplicationDto) {
    const application = this.collabApplicationRepository.create(dto);
    return this.collabApplicationRepository.save(application);
  }

  async updateCollabApplication(
    id: string,
    dto: UpdateCollabApplicationDto,
  ) {
    const application = await this.getCollabApplicationById(id);
    Object.assign(application, dto);
    application.updated_at = new Date();

    return this.collabApplicationRepository.save(application);
  }

  async deleteCollabApplication(id: string) {
    await this.getCollabApplicationById(id);
    return this.collabApplicationRepository.delete({
      collab_application_id: id,
    });
  }
}