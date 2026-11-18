import {IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";
import { ContactVia } from "../../../common/enums/contact-via.enum";

export class CreateUserProfileContactDto {
    @IsNotEmpty({ message: "user_profile_id is required" })
    @IsUUID(undefined, {
        message: "user_profile_id must be a valid UUID",
    })
    user_profile_id!: string;

    @IsNotEmpty({ message: "contact_via is required" })
    @IsEnum(ContactVia, {
        message:
            "contact_via must be Email, Phone, LinkedIn, WhatsApp, Telegram, or Other",
    })
    contact_via!: ContactVia;

    @IsNotEmpty({ message: "contact_value is required" })
    @IsString({ message: "contact_value must be a string" })
    contact_value!: string;
}

export class UpdateUserProfileContactDto {
    @IsOptional()
    @IsEnum(ContactVia, {
        message:
            "contact_via must be Email, Phone, LinkedIn, WhatsApp, Telegram, or Other",
    })
    contact_via?: ContactVia;

    @IsOptional()
    @IsString({ message: "contact_value must be a string" })
    @IsNotEmpty({ message: "contact_value must not be empty" })
    contact_value?: string;
}