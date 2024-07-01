import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./uses.entity";
import CreateUserDto from "./dto/createUser.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async getAllUsers() {
        console.log('Getting all users');
        return await this.usersRepository.find();
    }

    async getById(id: number) {
        const user = await this.usersRepository.findOne(
            { where: { id } }
        );

        if (user) {
            return user;
        }

        throw new BadRequestException('User not found');
    }

    async getByEmail(email: string) {
        const user = await this.usersRepository.findOne({
            where: { email }
        });

        if (user) {
            return user;
        }

        throw new BadRequestException('User not found');
    }


    async delete(id: number) {
        const user = await this.usersRepository.findOne({
            where: { id }
        });

        if (user) {
            await this.usersRepository.delete(id);
            return user;
        }
        throw new BadRequestException('User not found');
    }

    async create(newUserData: CreateUserDto) {
        const newUser = this.usersRepository.create(newUserData);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async update(id: number, newUserData: CreateUserDto) {
        const user = await this.usersRepository.findOne({
            where: { id }
        });

        if (user) {
            await this.usersRepository.update(id, newUserData);
            return await this.usersRepository.findOne({
                where: { id }
            });
        }

        throw new BadRequestException('User not found');
    }

    async count(email: string) {
        return await this.usersRepository.count({ where: { email } });
    }
}