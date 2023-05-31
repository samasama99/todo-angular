import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseBoolPipe, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';


@ApiTags('Task')
@Controller('task')
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  create(@Param('userId', ParseIntPipe) userId: number, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getTodos(@Param('userId', ParseIntPipe) userId: number) {
    return this.taskService.getTodos(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiQuery({ name: 'done' })
  update(@Param('id') id: string, @Query('done', ParseBoolPipe) done: boolean) {
    return this.taskService.update(+id, { done: done });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
