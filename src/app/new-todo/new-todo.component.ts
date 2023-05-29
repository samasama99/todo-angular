import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent {
  constructor(private todoService: TodoService) { }

  addTodo(text: string) {
    this.todoService.addTodo(text).subscribe(_ => {
      this.todoService.raiseTodosUpdate();
    });
  }
}
