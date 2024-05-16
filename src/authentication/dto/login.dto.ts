import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export default class LoginDto {
    @ApiProperty({required: true})
    @IsEmail()
    email: string;

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

