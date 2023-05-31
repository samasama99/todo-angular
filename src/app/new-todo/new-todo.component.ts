import { Component, EventEmitter, Output, inject } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent {
  private todoService = inject(TodoService);

  addTodo(text: string) {
    this.todoService.addTodo(text);
  }
}
