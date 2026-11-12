import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { AccountStatus } from "../../../common/enums/account-status.enum";
import { AdminLevel } from "../../../common/enums/admin-level.enum";
import { UserRole } from "../../../common/enums/user-role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    user_name!: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "user_email must be a valid email address" })
    user_email!: string;

    @IsNotEmpty()
    user_password!: string;

    @IsEnum(UserRole, { message: "user_role must be either 'User' or 'Admin'" })
    @IsNotEmpty()
    user_role!: UserRole;

    @IsOptional()
    @IsEnum(AdminLevel, { message: "admin_level must be 'Super Admin', 'Admin', or 'Moderator'" })
    admin_level?: AdminLevel | null;

    @IsEnum(AccountStatus, { message: "account_status must be 'Active', 'Banned', or 'Restricted'" })
    @IsNotEmpty()
    account_status!: AccountStatus;

    @IsOptional()
    created_at?: Date = new Date();

    @IsOptional()
    updated_at?: Date = new Date();
}

export class UpdateUserDto {
    @IsNotEmpty()
    user_name!: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "user_email must be a valid email address" })
    user_email!: string;

    @IsNotEmpty()
    user_password!: string;
    
    @IsEnum(UserRole, { message: "user_role must be either 'User' or 'Admin'" })
    @IsNotEmpty()
    user_role!: UserRole;

    @IsOptional()
    @IsEnum(AdminLevel, { message: "admin_level must be 'Super Admin', 'Admin', or 'Moderator'" })
    admin_level?: AdminLevel | null;

    @IsEnum(AccountStatus, { message: "account_status must be 'Active', 'Banned', or 'Restricted'" })
    @IsNotEmpty()
    account_status!: AccountStatus;

    @IsOptional()
    created_at?: Date = new Date();

    @IsOptional()
    updated_at?: Date = new Date();
}