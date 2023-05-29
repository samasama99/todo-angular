import { Task } from "src/task/entities/task.entity";
export declare class User {
    id: number;
    name: string;
    password: string;
    tasks: Task[];
}
