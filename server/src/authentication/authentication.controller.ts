import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { UsersService } from "src/users/users.service";
import RegisterDto from "./dto/register.dto";
import LoginDto from "./dto/login.dto";
import JwtAuthenticationGuard from "src/guards/jwt-authentication.guard";

@Controller('authentication')
export default class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly usersService: UsersService
    ) { }

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @Post('login')
    async login(@Body() loginData: LoginDto) {
        const { email, password } = loginData;
        return this.authenticationService.login(email, password);
    }

    @Post('logout')
    async logout(email: string) {
        return this.authenticationService.logout(email);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('all-users')
    async getAllUsers() {
        try {
            return this.usersService.getAllUsers();
        } catch (error) {
            if (error.message === 'Token has expired') {
                return {
                    message: 'Token has expired'
                }
            }
        }
    }

    @Post('refresh')
    async refresh(@Body() body: { refreshToken: string }) {
        const { refreshToken } = body;
        return this.authenticationService.validateRefreshTokenCreateNewAcessToken(refreshToken);
    }
}