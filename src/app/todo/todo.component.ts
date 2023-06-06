import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "../todo-state/todo.model";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo: Todo | undefined = undefined;
  @Output() deleteTodoEmitter = new EventEmitter<number>();
  @Output() updateTodoStateEmitter = new EventEmitter<Todo>();

  deleteTodo(id: number) {
    this.deleteTodoEmitter.emit(id);
  }

  updateState() {
    this.updateTodoStateEmitter.emit(this.todo);
  }

  getTimeElapsed(todo: Todo): string {
    const createdAt = new Date(todo.createdAt ?? Date.now()); // Assuming createdAt is a valid date string in your Todo model
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
