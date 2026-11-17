import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsUrl,
} from "class-validator";

export class CreateUserLinkedProfileDto {
  @IsUUID()
  user_profile_id!: string;

  @IsString()
  @IsNotEmpty()
  platform_name!: string;

  @IsUrl()
  profile_url!: string;
}

export class UpdateUserLinkedProfileDto {
  @IsUUID()
  user_profile_id!: string;

  @IsString()
  @IsNotEmpty()
  platform_name!: string;

  @IsUrl()
  profile_url!: string;
}