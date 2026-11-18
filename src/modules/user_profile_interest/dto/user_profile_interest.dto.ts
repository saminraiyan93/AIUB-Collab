import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateUserProfileInterestDto {
  @IsNotEmpty({ message: "user_profile_id is required" })
  @IsUUID(undefined, {
    message: "user_profile_id must be a valid UUID",
  })
  user_profile_id!: string;

  @IsNotEmpty({ message: "interest_id is required" })
  @IsUUID(undefined, {
    message: "interest_id must be a valid UUID",
  })
  interest_id!: string;
}

export class UpdateUserProfileInterestDto {
  @IsOptional()
  @IsUUID(undefined, {
    message: "user_profile_id must be a valid UUID",
  })
  user_profile_id?: string;

  @IsOptional()
  @IsUUID(undefined, {
    message: "interest_id must be a valid UUID",
  })
  interest_id?: string;
}