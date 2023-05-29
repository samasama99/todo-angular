import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    done: boolean;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}
