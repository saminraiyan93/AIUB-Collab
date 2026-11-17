import {IsEnum, IsNotEmpty, IsUUID} from "class-validator";
import { ContactVia } from "../../../common/enums/contact-via.enum";

export class CreateUserProfileContactDto {
    @IsNotEmpty()
    @IsUUID()
    user_profile_id!: string;

    @IsNotEmpty()
    @IsEnum(ContactVia)
    contact_via!: ContactVia;

    @IsNotEmpty()
    contact_value!: string;
}

export class UpdateUserProfileContactDto {
    @IsNotEmpty()
    @IsEnum(ContactVia)
    contact_via!: ContactVia;

    @IsNotEmpty()
    contact_value!: string;
}