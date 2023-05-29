import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    // @ApiProperty()
    // @Column()
    // text: string;

    @ApiProperty()
    @Column()
    done: boolean;
}
