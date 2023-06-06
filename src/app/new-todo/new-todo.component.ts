import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTodoComponent {
  @Output() addTodoEmitter = new EventEmitter<string>();

  addTodo(text: string) {
    this.addTodoEmitter.emit(text);
  }
}
