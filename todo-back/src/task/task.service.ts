import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private userService: UserService
    ) { }

    async create(createTaskDto: CreateTaskDto, userId: number) {
        const user = await this.userService.findOne(userId);
        const newTodo = this.taskRepository.create({
            ...createTaskDto,
            user,
        });
        return this.taskRepository.save(newTodo);
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: {
                id: id,
            },
        });
        task.done = updateTaskDto.done;
        return this.taskRepository.save(task);
    }

    async findAll(userId: number) {
        const user = await this.userService.findOne(userId);
        console.table(user);
        console.table(user.tasks);
        return user.tasks;
    }

    async remove(id: number) {
        const task = await this.taskRepository.findOne(
            {
                where: {
                    id: id,
                },
            }
        );
        return this.taskRepository.remove(task);
    }
}
