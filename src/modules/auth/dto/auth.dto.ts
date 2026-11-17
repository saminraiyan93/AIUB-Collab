import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: "user_email must be a valid email address" })
    user_email!: string;

    @IsNotEmpty()
    @IsString()
    user_password!: string;
}

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    user_name!: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "user_email must be a valid email address" })
    user_email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {
        message: "user_password must be at least 8 characters long",
    })
    user_password!: string;
}