import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateUserProfileSkillDto {
  @IsNotEmpty({ message: "user_profile_id is required" })
  @IsUUID(undefined, {
    message: "user_profile_id must be a valid UUID",
  })
  user_profile_id!: string;

  @IsNotEmpty({ message: "skill_id is required" })
  @IsUUID(undefined, {
    message: "skill_id must be a valid UUID",
  })
  skill_id!: string;
}

export class UpdateUserProfileSkillDto {
  @IsOptional()
  @IsUUID(undefined, {
    message: "user_profile_id must be a valid UUID",
  })
  user_profile_id?: string;

  @IsOptional()
  @IsUUID(undefined, {
    message: "skill_id must be a valid UUID",
  })
  skill_id?: string;
}