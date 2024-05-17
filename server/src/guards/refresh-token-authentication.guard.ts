import { AuthGuard } from "@nestjs/passport";

export default class RefreshTokenAuthenticationGuard extends AuthGuard('refresh-token') { }