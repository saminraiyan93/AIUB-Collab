import {
    IsNotEmpty,
    IsUUID,
    ValidateIf,
} from "class-validator";

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
    @ValidateIf((_object, value) => value !== undefined)
    @IsUUID(undefined, {
        message: "collab_post_id must be a valid UUID",
    })
    collab_post_id?: string;

    @ValidateIf((_object, value) => value !== undefined)
    @IsUUID(undefined, {
        message: "skill_id must be a valid UUID",
    })
    skill_id?: string;
}