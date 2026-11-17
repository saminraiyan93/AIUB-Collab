import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as argon2 from "argon2";
import { Repository } from "typeorm";
import { AccountStatus } from "../../common/enums/account-status.enum";
import { UserRole } from "../../common/enums/user-role.enum";
import { User } from "../user/entities/user.entity";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const userEmail = dto.user_email.trim().toLowerCase();
        const existingUser = await this.userRepository.findOne({
            where: { user_email: userEmail },
        });

        if (existingUser) {
            throw new ConflictException("An account with this email already exists");
        }

        const user = this.userRepository.create({
            user_name: dto.user_name.trim(),
            user_email: userEmail,
            user_password: await argon2.hash(dto.user_password),
            user_role: UserRole.USER,
            account_status: AccountStatus.ACTIVE,
        });

        const savedUser = await this.userRepository.save(user);
        return this.createAuthResponse(savedUser);
    }

    async login(dto: LoginDto) {
        const userEmail = dto.user_email.trim().toLowerCase();
        const user = await this.userRepository.findOne({
            where: { user_email: userEmail },
        });

        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        let passwordMatches = false;
        try {
            passwordMatches = await argon2.verify(
                user.user_password,
                dto.user_password,
            );
        } catch {
            passwordMatches = false;
        }

        if (!passwordMatches) {
            throw new UnauthorizedException("Invalid email or password");
        }

        if (user.account_status !== AccountStatus.ACTIVE) {
            throw new UnauthorizedException("This account is not active");
        }

        return this.createAuthResponse(user);
    }

    private createAuthResponse(user: User) {
        const payload = {
            sub: user.user_id,
            username: user.user_name,
            email: user.user_email,
            roles: [user.user_role],
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.user_id,
                username: user.user_name,
                email: user.user_email,
                hashedPassword: user.user_password,
                role: user.user_role,
                account_status: user.account_status,
            },
        };
    }
}