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
    return this.userService.findOne(userId)
      .then(user => this.taskRepository.create({ ...createTaskDto, user }))
      .then(newTodo => this.taskRepository.save(newTodo));
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.findOne({ where: { id: id } })
      .then(task => ({ ...task, done: updateTaskDto.done }))
      .then(task => this.taskRepository.save(task));
  }

  async getTodos(userId: number) {
    return this.userService.findOne(userId).then(user => user.tasks);
  }

  async remove(id: number): Promise<number> {
    return this.taskRepository.findOne({ where: { id: id } })
      .then(task => this.taskRepository.remove(task))
      .then(() => id);
  }
}
