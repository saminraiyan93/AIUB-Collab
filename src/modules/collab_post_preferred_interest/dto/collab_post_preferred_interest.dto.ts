import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateCollabPostPreferredInterestDto {
    @IsNotEmpty()
    @IsUUID()
    collab_post_id!: string;

    @IsNotEmpty()
    @IsUUID()
    interest_id!: string;
}

export class UpdateCollabPostPreferredInterestDto {
    @IsOptional()
    @IsUUID()
    collab_post_id?: string;

    @IsOptional()
    @IsUUID()
    interest_id?: string;
}