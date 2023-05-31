import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(userId: number, createTaskDto: CreateTaskDto): Promise<import("./entities/task.entity").Task>;
    getTodos(userId: number): Promise<import("./entities/task.entity").Task[]>;
    update(id: string, done: boolean): Promise<{
        done: boolean;
        id: number;
        text: string;
        user: import("../user/entities/user.entity").User;
    } & import("./entities/task.entity").Task>;
    remove(id: string): Promise<number>;
}
