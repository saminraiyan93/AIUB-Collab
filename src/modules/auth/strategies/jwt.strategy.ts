import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountStatus } from "../../../common/enums/account-status.enum";
import { AuthUser } from "../../../common/interfaces/auth-user.interface";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_BEARER_SECRET!,
        });
    }

    async validate(payload: { sub: string }): Promise<AuthUser> {
        const user = await this.userRepository.findOne({
            where: { user_id: payload.sub },
        });

        if (!user || user.account_status !== AccountStatus.ACTIVE) {
            throw new UnauthorizedException("User is not authorized");
        }

        return {
            id: user.user_id,
            username: user.user_name,
            email: user.user_email,
            roles: [user.user_role],
        };
    }
}
