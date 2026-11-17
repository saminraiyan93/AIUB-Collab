import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { AcademicIdentity } from "../../../common/enums/academic-identity.enum";

export class CreateCollabPostPreferredAcademicIdentityDto {
  @IsUUID()
  collab_post_id!: string;

  @IsEnum(AcademicIdentity)
  academic_identity!: AcademicIdentity;
}

export class UpdateCollabPostPreferredAcademicIdentityDto {
  @IsOptional()
  @IsUUID()
  collab_post_id?: string;

  @IsOptional()
  @IsEnum(AcademicIdentity)
  academic_identity?: AcademicIdentity;
}