import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserService } from 'src/user/user.service';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task, User])],
    controllers: [TaskController],
    providers: [TaskService, UserService]
})
export class TaskModule { }
