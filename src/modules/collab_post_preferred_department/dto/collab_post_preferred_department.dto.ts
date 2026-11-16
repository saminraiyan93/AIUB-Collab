import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateCollabPostPreferredDepartmentDto {
  @IsNotEmpty()
  @IsUUID()
  collab_post_id!: string;

  @IsNotEmpty()
  @IsUUID()
  department_id!: string;
}

export class UpdateCollabPostPreferredDepartmentDto {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  collab_post_id?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  department_id?: string;
}