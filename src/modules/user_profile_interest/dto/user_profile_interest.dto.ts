import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateUserProfileInterestDto {
    @IsNotEmpty()
    @IsUUID()
    user_profile_id!: string;

    @IsNotEmpty()
    @IsUUID()
    interest_id!: string;
}

export class UpdateUserProfileInterestDto {
    @IsNotEmpty()
    @IsUUID()
    user_profile_id!: string;

    @IsNotEmpty()
    @IsUUID()
    interest_id!: string;
}