import {IsDateString,IsEnum,IsInt,IsNotEmpty,IsOptional,IsUUID,Min} from "class-validator";
import { CollabCategory } from "../../../common/enums/collab-category.enum";
import { CollabType } from "../../../common/enums/collab-type.enum";
import { LocationType } from "../../../common/enums/location-type.enum";
import { PostStatus } from "../../../common/enums/post-status.enum";

export class CreateCollabPostDto {
    @IsNotEmpty()
    @IsUUID()
    user_profile_id!: string;

    @IsNotEmpty()
    post_title!: string;

    @IsOptional()
    post_description?: string | null;

    @IsNotEmpty()
    @IsEnum(CollabCategory)
    collab_category!: CollabCategory;

    @IsNotEmpty()
    @IsEnum(CollabType)
    collab_type!: CollabType;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    collaborators_needed!: number;

    @IsNotEmpty()
    @IsDateString()
    application_deadline!: Date;

    @IsNotEmpty()
    @IsEnum(LocationType)
    location_type!: LocationType;

    @IsNotEmpty()
    @IsUUID()
    post_contact_id!: string;
}

export class UpdateCollabPostDto {
    @IsOptional()
    post_title?: string;

    @IsOptional()
    post_description?: string | null;

    @IsOptional()
    @IsEnum(CollabCategory)
    collab_category?: CollabCategory;

    @IsOptional()
    @IsEnum(CollabType)
    collab_type?: CollabType;

    @IsOptional()
    @IsInt()
    @Min(1)
    collaborators_needed?: number;

    @IsOptional()
    @IsDateString()
    application_deadline?: Date;

    @IsOptional()
    @IsEnum(LocationType)
    location_type?: LocationType;

    @IsOptional()
    @IsEnum(PostStatus)
    post_status?: PostStatus;

    @IsOptional()
    @IsUUID()
    post_contact_id?: string;
}