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

    @IsNotEmpty({ message: "collab_category is required" })
    @IsEnum(CollabCategory, {
        message: "collab_category must be Research or Project",
    })
    collab_category!: CollabCategory;

    @IsNotEmpty({ message: "collab_type is required" })
    @IsEnum(CollabType, {
        message: "collab_type must be Co-author, Collaborator, or Other",
    })
    collab_type!: CollabType;

    @IsNotEmpty({ message: "collaborators_needed is required" })
    @IsInt({ message: "collaborators_needed must be an integer" })
    @Min(1, {
        message: "collaborators_needed must be at least 1",
    })
    collaborators_needed!: number;

    @IsNotEmpty({ message: "application_deadline is required" })
    @IsDateString(
        {},
        { message: "application_deadline must be a valid date" },
    )
    application_deadline!: string;

    @IsNotEmpty({ message: "location_type is required" })
    @IsEnum(LocationType, {
        message: "location_type must be Online, Onsite, or Hybrid",
    })
    location_type!: LocationType;

    @IsNotEmpty({ message: "post_contact_id is required" })
    @IsUUID(undefined, {
        message: "post_contact_id must be a valid UUID",
    })
    post_contact_id!: string;
}

export class UpdateCollabPostDto {
    @IsOptional()
    post_title?: string;

    @IsOptional()
    post_description?: string | null;

    @IsOptional()
    @IsEnum(CollabCategory, {
        message: "collab_category must be Research or Project",
    })
    collab_category?: CollabCategory;

    @IsOptional()
    @IsEnum(CollabType, {
        message: "collab_type must be Co-author, Collaborator, or Other",
    })
    collab_type?: CollabType;

    @IsOptional()
    @IsInt({ message: "collaborators_needed must be an integer" })
    @Min(1, {
        message: "collaborators_needed must be at least 1",
    })
    collaborators_needed?: number;

    @IsOptional()
    @IsDateString(
        {},
        { message: "application_deadline must be a valid date" },
    )
    application_deadline?: string;

    @IsOptional()
    @IsEnum(LocationType, {
        message: "location_type must be Online, Onsite, or Hybrid",
    })
    location_type?: LocationType;

    @IsOptional()
    @IsEnum(PostStatus, {
        message: "post_status must be Pending, Open, or Closed",
    })
    post_status?: PostStatus;

    @IsOptional()
    @IsUUID(undefined, {
        message: "post_contact_id must be a valid UUID",
    })
    post_contact_id?: string;
}