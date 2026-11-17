import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateUserLinkedProfileDto,
  UpdateUserLinkedProfileDto,
} from "./dto/user_linked_profile.dto";
import { UserLinkedProfile } from "./entities/user_linked_profile.entity";

@Injectable()
export class UserLinkedProfileService {
  constructor(
    @InjectRepository(UserLinkedProfile)
    private readonly userLinkedProfileRepository: Repository<UserLinkedProfile>,
  ) {}

  async getUserLinkedProfiles() {
    return await this.userLinkedProfileRepository.find();
  }

  async getUserLinkedProfileById(id: string) {
    const userLinkedProfile = await this.userLinkedProfileRepository.findOneBy({
      linked_profile_id: id,
    });

    if (!userLinkedProfile) {
      throw new NotFoundException("User linked profile not found");
    }

    return userLinkedProfile;
  }

  async createUserLinkedProfile(dto: CreateUserLinkedProfileDto) {
    const userLinkedProfile = this.userLinkedProfileRepository.create(dto);
    return await this.userLinkedProfileRepository.save(userLinkedProfile);
  }

  async updateUserLinkedProfile(
    id: string,
    dto: UpdateUserLinkedProfileDto,
  ) {
    const userLinkedProfile = await this.getUserLinkedProfileById(id);
    Object.assign(userLinkedProfile, dto);

    return await this.userLinkedProfileRepository.save(userLinkedProfile);
  }

  async deleteUserLinkedProfile(id: string) {
    const userLinkedProfile = await this.getUserLinkedProfileById(id);

    return await this.userLinkedProfileRepository.delete({
      linked_profile_id: userLinkedProfile.linked_profile_id,
    });
  }
}