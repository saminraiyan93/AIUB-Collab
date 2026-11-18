import {IsEnum, IsNotEmpty, IsOptional, IsUUID} from "class-validator";
import { AcademicIdentity } from "../../../common/enums/academic-identity.enum";

export class CreateCollabPostPreferredAcademicIdentityDto {
    @IsNotEmpty({ message: "collab_post_id is required" })
    @IsUUID(undefined, {
        message: "collab_post_id must be a valid UUID",
    })
    collab_post_id!: string;

    @IsNotEmpty({ message: "academic_identity is required" })
    @IsEnum(AcademicIdentity, {
        message: "academic_identity must be Student, Faculty, Alumni, or Staff",
    })
    academic_identity!: AcademicIdentity;
}

export class UpdateCollabPostPreferredAcademicIdentityDto {
    @IsOptional()
    @IsUUID(undefined, {
        message: "collab_post_id must be a valid UUID",
    })
    collab_post_id?: string;

    @IsOptional()
    @IsEnum(AcademicIdentity, {
        message: "academic_identity must be Student, Faculty, Alumni, or Staff",
    })
    academic_identity?: AcademicIdentity;
}