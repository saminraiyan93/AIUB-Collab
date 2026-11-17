import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateCollabPostPreferredAcademicIdentityDto,
  UpdateCollabPostPreferredAcademicIdentityDto,
} from "./dto/collab_post_preferred_academic_identity.dto";
import { CollabPostPreferredAcademicIdentity } from "./entities/collab_post_preferred_academic_identity.entity";

@Injectable()
export class CollabPostPreferredAcademicIdentityService {
  constructor(
    @InjectRepository(CollabPostPreferredAcademicIdentity)
    private readonly collabPostPreferredAcademicIdentityRepository: Repository<CollabPostPreferredAcademicIdentity>,
  ) {}

  async getAll() {
    return await this.collabPostPreferredAcademicIdentityRepository.find();
  }

  async getById(id: string) {
    const preferredAcademicIdentity =
      await this.collabPostPreferredAcademicIdentityRepository.findOneBy({
        post_preferred_academic_identity_id: id,
      });

    if (!preferredAcademicIdentity) {
      throw new NotFoundException(
        "Preferred academic identity not found",
      );
    }

    return preferredAcademicIdentity;
  }

  async create(dto: CreateCollabPostPreferredAcademicIdentityDto) {
    const preferredAcademicIdentity =
      this.collabPostPreferredAcademicIdentityRepository.create(dto);

    return await this.collabPostPreferredAcademicIdentityRepository.save(
      preferredAcademicIdentity,
    );
  }

  async update(
    id: string,
    dto: UpdateCollabPostPreferredAcademicIdentityDto,
  ) {
    const preferredAcademicIdentity = await this.getById(id);
    Object.assign(preferredAcademicIdentity, dto);

    return await this.collabPostPreferredAcademicIdentityRepository.save(
      preferredAcademicIdentity,
    );
  }

  async delete(id: string) {
    const preferredAcademicIdentity = await this.getById(id);

    return await this.collabPostPreferredAcademicIdentityRepository.delete({
      post_preferred_academic_identity_id:
        preferredAcademicIdentity.post_preferred_academic_identity_id,
    });
  }
}