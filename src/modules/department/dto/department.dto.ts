import { IsNotEmpty } from "class-validator";

export class CreateDepartmentDto {
    @IsNotEmpty()
    department_name!: string;
}

export class UpdateDepartmentDto {
    @IsNotEmpty()
    department_name!: string;
}