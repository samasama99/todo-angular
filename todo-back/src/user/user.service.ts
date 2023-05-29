import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Task) private taskRepository: Repository<Task>

    ) {

    }

    create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create({ ...createUserDto });
        return this.userRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.userRepository.findOneOrFail({
            where: {
                id: id,
            },
            relations: ['tasks'],
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        let user = await this.findOne(id);
        user.name = updateUserDto.name;
        this.userRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.userRepository.findOneOrFail({
            where: {
                id: id,
            },
            relations: ['tasks'],
        });;
        user.tasks.map(task => this.taskRepository.remove(task));
        return await this.userRepository.remove(user);
    }
}
