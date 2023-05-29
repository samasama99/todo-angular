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
    this.todoService.deleteTodo(id).subscribe(_ => {
      this.todoService.raiseTodosUpdate();
    });
  }

  updateState(id: number) {
    if (this.todo)
      this.todoService.updateTodo(id, !this.todo.done).subscribe(_ => {
        this.todoService.raiseTodosUpdate();
      });
  }

}
