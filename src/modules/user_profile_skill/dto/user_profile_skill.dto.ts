import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateUserProfileSkillDto {
    @IsNotEmpty()
    @IsUUID()
    user_profile_id!: string;

    @IsNotEmpty()
    @IsUUID()
    skill_id!: string;
}

export class UpdateUserProfileSkillDto {
    @IsNotEmpty()
    @IsUUID()
    user_profile_id!: string;

    @IsNotEmpty()
    @IsUUID()
    skill_id!: string;
}