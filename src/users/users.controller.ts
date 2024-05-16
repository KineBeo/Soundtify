import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import CreateUserDto from "./dto/createUser.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }

    @Get('get-all-users')
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.usersService.getById(id);
    }

    @Get(':email')
    async getByEmail(@Param('email') email: string) {
        return this.usersService.getByEmail(email);
    }

    @Post('create')
    async create(@Body() newUserData: CreateUserDto) {
        return this.usersService.create(newUserData);
    }

    @Put(':id')
    async updateById(@Param('id') id: number, @Body() newUserData: CreateUserDto) {
        return this.usersService.update(id, newUserData);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
}