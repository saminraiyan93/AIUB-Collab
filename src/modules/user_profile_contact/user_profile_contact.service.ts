import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserProfileContact } from "./entities/user_profile_contact.entity";
import {CreateUserProfileContactDto,UpdateUserProfileContactDto} from "./dto/user_profile_contact.dto";

@Injectable()
export class UserProfileContactService {
    constructor(
        @InjectRepository(UserProfileContact)
        private readonly userProfileContactRepository: Repository<UserProfileContact>,
    ) {}

    async getUserProfileContacts() {
        return await this.userProfileContactRepository.find({
            relations: ["user_profile"],
        });
    }

    async getUserProfileContactById(id: string) {
        const userProfileContact =
            await this.userProfileContactRepository.findOne({
                where: {
                    user_profile_contact_id: id,
                },
                relations: ["user_profile"],
            });

        if (!userProfileContact) {
            throw new NotFoundException(
                "User profile contact not found",
            );
        }
        return userProfileContact;
    }

    async createUserProfileContact(dto: CreateUserProfileContactDto) {
        const userProfileContact = this.userProfileContactRepository.create(dto);

        const savedUserProfileContact = await this.userProfileContactRepository.save(userProfileContact);

        return {
            message: "User profile contact creation successful.",
            data: savedUserProfileContact,
        };
    }

    async updateUserProfileContact(id: string, dto: UpdateUserProfileContactDto) {
        const userProfileContact = await this.getUserProfileContactById(id);
        Object.assign(userProfileContact, dto);

        const savedUserProfileContact = await this.userProfileContactRepository.save(userProfileContact);

        return {
            message: "User profile contact update successful.",
            data: savedUserProfileContact,
        };
    }

    async deleteUserProfileContact(id: string) {
    await this.getUserProfileContactById(id);

        const deleteResult =
            await this.userProfileContactRepository.delete({
                user_profile_contact_id: id,
        });

        return {
            message: "User profile contact deletion successful.",
            data: deleteResult,
        };
    }
}