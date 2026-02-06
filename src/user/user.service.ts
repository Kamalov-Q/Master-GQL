import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.usersRepository.findOneByOrFail({ id });
    }

    async create(createUserInput: CreateUserInput) {
        const newUser = this.usersRepository.create(createUserInput);
        return await this.usersRepository.save(newUser);
    }

    async update(id: number, updateUserInput: UpdateUserInput) {
        const user = await this.usersRepository.findOneByOrFail({ id });
        return await this.usersRepository.save(new User(Object.assign(user, updateUserInput)));
    }

    async delete(id: number) {
        const result = await this.usersRepository.delete(id);
        return result.affected === 1;
    }


}
