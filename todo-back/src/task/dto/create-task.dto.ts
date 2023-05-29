import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class CreateTaskDto {
    @ApiProperty()
    @Column()
    text: string;

    @ApiProperty()
    @Column()
    done: boolean;
}
