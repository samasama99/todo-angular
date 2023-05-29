import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Task])],
    controllers: [UserController],
    providers: [UserService],
    exports: [TypeOrmModule.forFeature([User]), UserService]
})
export class UserModule { }
