import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import RegisterDto from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import User from "src/users/uses.entity";
import TokenPayload from "./tokenPayload.interface";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    public async register(registerUserDto: RegisterDto) {
        const emailExist = await this.usersService.count(registerUserDto.email);
        if (emailExist) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
        try {
            const createdUser = await this.usersService.create({
                ...registerUserDto,
                password: hashedPassword,
            })
            createdUser.password = undefined;
            return {
                message: 'User created successfully',
                user: createdUser
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    public async login(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            return {
                message: 'Login successful',
                accessToken: this.createAccessTokenForUser(user),
                refreshToken: await this.createRefreshTokenForUser(user.email),
                email: user.email,
                name: user.name,
            }
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }
    }

    public async logout() {
        return {
            message: 'Logout successful'
        }
    }

    public async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const matched = await bcrypt.compare(plainTextPassword, hashedPassword);
        if (!matched) {
            throw new BadRequestException('Invalid credentials');
        }
    }

    public createAccessTokenForUser(user: User) {
        const payload = { email: user.email, name: user.name };
        return this.jwtService.sign(payload);
    }

    public async createRefreshTokenForUser(userEmail: string) {
        const user = await this.usersService.getByEmail(userEmail);
        const payload = { email: user.email };
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: '1d',
        });

        user.currentRefreshToken = refreshToken;
        console.log(user);
        return refreshToken;
    }

    public async validateRefreshTokenCreateNewAcessToken(refreshToken: string) {
        const user = await this.jwtService.decode(refreshToken) as TokenPayload;
        return this.createAccessTokenForUser(await this.usersService.getByEmail(user.email));
    }
}