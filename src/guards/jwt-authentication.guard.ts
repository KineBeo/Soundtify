import { ExecutionContext, Injectable, CanActivate, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export default class JwtAuthenticationGuard {
    constructor(
        private readonly jwtService: JwtService,
    ) {

    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        let token = request.headers.authorization;
        if (!token) {
            throw new UnauthorizedException('Token is required');
        }

        token = token.replace('Bearer ', '');
        try {
            const payload = this.jwtService.decode(token);
            console.log(payload);
            if (payload.exp && payload.exp * 1000 < Date.now()) {
                throw new UnauthorizedException('Token has expired');
            }

            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}