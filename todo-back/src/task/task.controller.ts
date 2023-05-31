import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseBoolPipe, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post(':userId')
  create(@Param('userId', ParseIntPipe) userId: number, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto, userId);
  }

  @Get(':userId')
  getTodos(@Param('userId', ParseIntPipe) userId: number) {
    return this.taskService.getTodos(userId);
  }

  @Patch(':id')
  @ApiQuery({ name: 'done' })
  update(@Param('id') id: string, @Query('done', ParseBoolPipe) done: boolean) {
    return this.taskService.update(+id, { done: done });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
