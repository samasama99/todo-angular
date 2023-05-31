import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    private taskRepository;
    constructor(userRepository: Repository<User>, taskRepository: Repository<Task>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        id: number;
        password: string;
        tasks: Task[];
    } & User>;
    remove(id: number): Promise<User>;
}
