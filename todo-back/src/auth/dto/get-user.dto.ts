import { ApiProperty } from "@nestjs/swagger";

export class GetUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
