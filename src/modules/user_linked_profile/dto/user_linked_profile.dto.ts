import {IsNotEmpty, IsOptional, IsString, IsUUID, IsUrl} from "class-validator";

export class CreateUserLinkedProfileDto {
  @IsNotEmpty({ message: "user_profile_id is required" })
  @IsUUID(undefined, {
    message: "user_profile_id must be a valid UUID",
  })
  user_profile_id!: string;

  @IsNotEmpty({ message: "platform_name is required" })
  @IsString({ message: "platform_name must be a string" })
  platform_name!: string;

  @IsNotEmpty({ message: "profile_url is required" })
  @IsUrl(undefined, {
    message: "profile_url must be a valid URL",
  })
  profile_url!: string;
}

export class UpdateUserLinkedProfileDto {
  @IsOptional()
  @IsString({ message: "platform_name must be a string" })
  platform_name?: string;

  @IsOptional()
  @IsUrl(undefined, {
    message: "profile_url must be a valid URL",
  })
  profile_url?: string;
}