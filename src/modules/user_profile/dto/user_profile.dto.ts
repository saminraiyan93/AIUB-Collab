import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { AcademicIdentity } from "../../../common/enums/academic-identity.enum";

export class CreateUserProfileDto {
    @IsNotEmpty()
    user_id!: string;

    @IsOptional()
    profile_image?: string | null;

    @IsEnum(AcademicIdentity, { message: "academic_identity must be 'Student', 'Faculty', 'Alumni', or 'Staff'" })
    @IsNotEmpty()
    academic_identity!: AcademicIdentity;

    @IsNotEmpty()
    department_id!: string;

    @IsOptional()
    bio?: string | null;

    @IsOptional()
    created_at?: Date = new Date();

    @IsOptional()
    updated_at?: Date = new Date();
}

export class UpdateUserProfileDto {
    @IsNotEmpty()
    user_id!: string;

    @IsOptional()
    profile_image?: string | null;

    @IsEnum(AcademicIdentity, { message: "academic_identity must be 'Student', 'Faculty', 'Alumni', or 'Staff'" })
    @IsNotEmpty()
    academic_identity!: AcademicIdentity;

    @IsNotEmpty()
    department_id!: string;

    @IsOptional()
    bio?: string | null;

    @IsOptional()
    created_at?: Date = new Date();

    @IsOptional()
    updated_at?: Date = new Date();
}