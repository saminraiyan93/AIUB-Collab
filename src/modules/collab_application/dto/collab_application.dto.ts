import {
    IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from "class-validator";
import { ApplicationStatus } from "../../../common/enums/application-status.enum"

export class CreateCollabApplicationDto {
  @IsNotEmpty()
  @IsUUID()
  collab_post_id!: string;

  @IsNotEmpty()
  @IsUUID()
  applicant_profile_id!: string;

  @IsNotEmpty()
  applicant_message!: string;

  @IsNotEmpty()
  @IsEnum(ApplicationStatus)
  application_status!: ApplicationStatus;

  @IsNotEmpty()
  @IsUUID()
  applicant_contact_id!: string;
}

export class UpdateCollabApplicationDto {

  @IsOptional()
  @IsNotEmpty()
  applicant_message?: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  application_status?: ApplicationStatus;

}