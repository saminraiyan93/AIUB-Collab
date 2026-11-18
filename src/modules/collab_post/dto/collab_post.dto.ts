import {IsDateString,IsEnum,IsInt,IsNotEmpty,IsOptional,IsUUID,Min,registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CollabCategory } from "../../../common/enums/collab-category.enum";
import { CollabType } from "../../../common/enums/collab-type.enum";
import { LocationType } from "../../../common/enums/location-type.enum";
import { PostStatus } from "../../../common/enums/post-status.enum";

function IsFutureDate(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: "isFutureDate",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: unknown) {
                    if (typeof value !== "string") return false;
                    return new Date(value).getTime() > Date.now();
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be in the future`;
                },
            },
        });
    };
}

export class CreateCollabPostDto {
    @ApiProperty({
        description: "UUID of the user profile creating the post",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440000",
    })
    @IsNotEmpty()
    @IsUUID()
    user_profile_id!: string;

    @ApiProperty({
        description: "Title of the collaboration post",
        example: "AI Research Project",
    })
    @IsNotEmpty({message: "post_title is required"})
    post_title!: string;

    @ApiPropertyOptional({
        description: "Detailed description of the collaboration",
        example: "Looking for collaborators to build a machine-learning prototype.",
        nullable: true,
    })
    @IsOptional()
    post_description?: string | null;

    @ApiProperty({
        enum: CollabCategory,
        example: CollabCategory.PROJECT,
    })
    @IsNotEmpty({ message: "collab_category is required" })
    @IsEnum(CollabCategory, {
        message: "collab_category must be Research or Project",
    })
    collab_category!: CollabCategory;

    @ApiProperty({
        enum: CollabType,
        example: CollabType.COLLABORATOR,
    })
    @IsNotEmpty({ message: "collab_type is required" })
    @IsEnum(CollabType, {
        message: "collab_type must be Co-author, Collaborator, or Other",
    })
    collab_type!: CollabType;

    @ApiProperty({
        description: "Number of collaborators still needed",
        minimum: 1,
        example: 3,
    })
    @IsNotEmpty({ message: "collaborators_needed is required" })
    @IsInt({ message: "collaborators_needed must be an integer" })
    @Min(1, {
        message: "collaborators_needed must be at least 1",
    })
    collaborators_needed!: number;

    @ApiProperty({
        description: "Application deadline; must be a valid future date",
        format: "date-time",
        example: "2027-12-31T23:59:59.000Z",
    })
    @IsNotEmpty({ message: "application_deadline is required" })
    @IsDateString(
        {},
        { message: "application_deadline must be a valid date" },
    )
    @IsFutureDate({ message: "application_deadline must be in the future" })
    application_deadline!: string;

    @ApiProperty({
        enum: LocationType,
        example: LocationType.HYBRID,
    })
    @IsNotEmpty({ message: "location_type is required" })
    @IsEnum(LocationType, {
        message: "location_type must be Online, Onsite, or Hybrid",
    })
    location_type!: LocationType;

    @ApiProperty({
        description: "UUID of a contact owned by the selected user profile",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440001",
    })
    @IsNotEmpty({ message: "post_contact_id is required" })
    @IsUUID(undefined, {
        message: "post_contact_id must be a valid UUID",
    })
    post_contact_id!: string;
}

export class UpdateCollabPostDto {
    @ApiPropertyOptional({
        description: "Updated title of the collaboration post",
        example: "Updated AI Research Project",
    })
    @IsOptional()
    post_title?: string;

    @ApiPropertyOptional({
        description: "Updated description",
        nullable: true,
        example: "Seeking two additional developers.",
    })
    @IsOptional()
    post_description?: string | null;

    @ApiPropertyOptional({
        enum: CollabCategory,
        example: CollabCategory.RESEARCH,
    })
    @IsOptional()
    @IsEnum(CollabCategory, {
        message: "collab_category must be Research or Project",
    })
    collab_category?: CollabCategory;

    @ApiPropertyOptional({
        enum: CollabType,
        example: CollabType.CO_AUTHOR,
    })
    @IsOptional()
    @IsEnum(CollabType, {
        message: "collab_type must be Co-author, Collaborator, or Other",
    })
    collab_type?: CollabType;

    @ApiPropertyOptional({
        description: "Updated number of collaborators still needed",
        minimum: 1,
        example: 2,
    })
    @IsOptional()
    @IsInt({ message: "collaborators_needed must be an integer" })
    @Min(1, {
        message: "collaborators_needed must be at least 1",
    })
    collaborators_needed?: number;

    @ApiPropertyOptional({
        description: "Updated application deadline; must be a future date",
        format: "date-time",
        example: "2027-12-31T23:59:59.000Z",
    })
    @IsOptional()
    @IsDateString(
        {},
        { message: "application_deadline must be a valid date" },
    )
    @IsFutureDate({ message: "application_deadline must be in the future" })
    application_deadline?: string;

    @ApiPropertyOptional({
        enum: LocationType,
        example: LocationType.ONLINE,
    })
    @IsOptional()
    @IsEnum(LocationType, {
        message: "location_type must be Online, Onsite, or Hybrid",
    })
    location_type?: LocationType;

    @ApiPropertyOptional({
        enum: PostStatus,
        example: PostStatus.OPEN,
    })
    @IsOptional()
    @IsEnum(PostStatus, {
        message: "post_status must be Pending, Open, or Closed",
    })
    post_status?: PostStatus;

    @ApiPropertyOptional({
        description: "Updated contact UUID; must belong to this post's user profile",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440001",
    })
    @IsOptional()
    @IsUUID(undefined, {
        message: "post_contact_id must be a valid UUID",
    })
    post_contact_id?: string;
}