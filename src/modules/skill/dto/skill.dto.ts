import { IsNotEmpty } from "class-validator";

export class CreateSkillDto {
    @IsNotEmpty()
    skill_name!: string;
}

export class UpdateSkillDto {
    @IsNotEmpty()
    skill_name!: string;
}