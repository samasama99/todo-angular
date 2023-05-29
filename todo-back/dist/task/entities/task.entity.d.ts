import { User } from "src/user/entities/user.entity";
export declare class Task {
    id: number;
    text: string;
    done: boolean;
    user: User;
}
