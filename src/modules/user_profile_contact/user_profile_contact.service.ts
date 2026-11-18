import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserProfileContact } from "./entities/user_profile_contact.entity";
import {CreateUserProfileContactDto,UpdateUserProfileContactDto} from "./dto/user_profile_contact.dto";
import { AuthUser } from "@/common/interfaces/auth-user.interface";
import { UserRole } from "@/common/enums/user-role.enum";
import { UserProfile } from "../user_profile/entities/user_profile.entity";


@Injectable()
export class UserProfileContactService {
    constructor(
        @InjectRepository(UserProfileContact)
        private readonly userProfileContactRepository: Repository<UserProfileContact>,
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>,
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

    async createUserProfileContact(dto: CreateUserProfileContactDto, user: AuthUser) {
        const profile = await this.userProfileRepository.findOne({where: { user_profile_id: dto.user_profile_id },});
        if (!profile) {
            throw new NotFoundException("User profile not found");
        }
        if (profile.user_id !== user.id) {
            throw new ForbiddenException("You can only create contacts for your own profile");
        }
        const contact = this.userProfileContactRepository.create(dto);
        const savedContact = await this.userProfileContactRepository.save(contact);
        return {
            message: "User profile contact creation successful.",
            data: savedContact,
        };
    }

    async updateUserProfileContact(id: string, dto: UpdateUserProfileContactDto, user: AuthUser) {
        const contact = await this.getUserProfileContactById(id);
        await this.validateProfileOwnership(contact.user_profile_id,user);
        Object.assign(contact, dto);
        const savedContact = await this.userProfileContactRepository.save(contact);
        return {
            message: "User profile contact update successful.",
            data: savedContact,
        };
    }

    async deleteUserProfileContact(id: string, user: AuthUser) {
        const contact = await this.getUserProfileContactById(id);

        if (!user.roles.includes(UserRole.ADMIN)) {
            await this.validateProfileOwnership(contact.user_profile_id, user,);
        }
        const deleteResult = await this.userProfileContactRepository.delete({user_profile_contact_id: id,});
        return {
            message: "User profile contact deletion successful.",
            data: deleteResult,
        };
    }

    private async validateProfileOwnership(userProfileId: string, user: AuthUser) {
        const profile = await this.userProfileRepository.findOne({where: { user_profile_id: userProfileId },});
        if (!profile) {
            throw new NotFoundException("User profile not found");
        }
        if (profile.user_id !== user.id) {
            throw new ForbiddenException("You can only modify your own profile contacts");
        }
    }
}