import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  constructor(private todoService: TodoService) { }

  @Input() todo: Todo | undefined = undefined;
  @Input() index: number = 0;

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  updateState(id: number) {
    if (this.todo)
      this.todoService.updateTodo(id, !this.todo.done);
  }

  getTimeElapsed(todo: Todo): string {
    const createdAt = new Date(todo.createdAt); // Assuming createdAt is a valid date string in your Todo model
    const now = new Date();
    const timeDiff = now.getTime() - createdAt.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
    const daysDiff = Math.floor(hoursDiff / 24);

    if (daysDiff === 0) {
      return 'today';
    }
    else if (daysDiff > 0) {
      return `${daysDiff} days ago`;
    } else {
      return `${hoursDiff} hours ago`;
    }
  }

}
