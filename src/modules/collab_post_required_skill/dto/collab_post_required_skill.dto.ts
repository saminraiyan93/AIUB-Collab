import { IsNotEmpty, IsUUID, IsOptional } from "class-validator";

export class CreateCollabPostRequiredSkillDto {
    @IsNotEmpty()
    @IsUUID()
    collab_post_id!: string;

    @IsNotEmpty()
    @IsUUID()
    skill_id!: string;
}

export class UpdateCollabPostRequiredSkillDto {
    @IsOptional()
    @IsUUID()
    collab_post_id?: string;

    @IsOptional()
    @IsUUID()
    skill_id?: string;
}