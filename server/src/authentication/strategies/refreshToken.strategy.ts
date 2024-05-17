import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import TokenPayload from "../tokenPayload.interface";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "refresh-token") {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
            ignoreExpiration: false,
            secretOrKey: configService.get("REFRESH_ACCESS_TOKEN_SECRET")
        });
    }

    async validate(payload: TokenPayload) {
        return this.userService.getByEmail(payload.email);
    }
}