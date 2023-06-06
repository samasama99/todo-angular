import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) { }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ ...createUserDto });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id: id },
      relations: ['tasks'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.findOne(id)
      .then(user => ({ ...user, name: updateUserDto.name }))
      .then(user => this.userRepository.save(user))
  }

  async remove(id: number) {
    return this.userRepository.findOneOrFail({
      where: { id: id },
      relations: ['tasks'],
    }).then(user => {
      user.tasks.map(task => this.taskRepository.remove(task));
      return this.userRepository.remove(user);
    });
  }
}
