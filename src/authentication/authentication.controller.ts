import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { UsersService } from "src/users/users.service";
import RegisterDto from "./dto/register.dto";
import LoginDto from "./dto/login.dto";

@Controller('authentication')
export default class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly usersService: UsersService
    ) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @Post('login')
    async login(@Body() loginData: LoginDto) {
        const { email, password } = loginData;
        return this.authenticationService.login(email, password);
    }
}