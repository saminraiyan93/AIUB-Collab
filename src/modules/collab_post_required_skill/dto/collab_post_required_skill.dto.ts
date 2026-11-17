import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateCollabPostRequiredSkillDto {
    @IsNotEmpty({ message: "collab_post_id is required" })
    @IsUUID(undefined, {
        message: "collab_post_id must be a valid UUID",
    })
    collab_post_id!: string;

    @IsNotEmpty({ message: "skill_id is required" })
    @IsUUID(undefined, {
        message: "skill_id must be a valid UUID",
    })
    skill_id!: string;
}

export class UpdateCollabPostRequiredSkillDto {
    @IsOptional()
    @IsUUID(undefined, {
        message: "collab_post_id must be a valid UUID",
    })
    collab_post_id?: string;

    @IsOptional()
    @IsUUID(undefined, {
        message: "skill_id must be a valid UUID",
    })
    skill_id?: string;
}