import { ApiProperty } from "@nestjs/swagger";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.user, { onDelete: 'CASCADE' })
    tasks: Task[];
}
