import { IsNotEmpty } from "class-validator";

export class CreateInterestDto {
    @IsNotEmpty()
    interest_name!: string;
}

export class UpdateInterestDto {
    @IsNotEmpty()
    interest_name!: string;
}