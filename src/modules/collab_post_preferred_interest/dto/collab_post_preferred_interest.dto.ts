import { IsNotEmpty, IsUUID, ValidateIf } from "class-validator";

export class CreateCollabPostPreferredInterestDto {
    @IsNotEmpty({ message: "collab_post_id is required" })
    @IsUUID(undefined, {
        message: "collab_post_id must be a valid UUID",
    })
    collab_post_id!: string;

    @IsNotEmpty({ message: "interest_id is required" })
    @IsUUID(undefined, {
        message: "interest_id must be a valid UUID",
    })
    interest_id!: string;
}

export class UpdateCollabPostPreferredInterestDto {
    @ValidateIf((_object, value) => value !== undefined)
    @IsNotEmpty({ message: "collab_post_id must not be empty" })
    @IsUUID(undefined, {
        message: "collab_post_id must be a valid UUID",
    })
    collab_post_id?: string;

    @ValidateIf((_object, value) => value !== undefined)
    @IsNotEmpty({ message: "interest_id must not be empty" })
    @IsUUID(undefined, {
        message: "interest_id must be a valid UUID",
    })
    interest_id?: string;
}