import { Component, OnDestroy } from '@angular/core';
import { Todo, TodoService } from '../todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos-viewer',
  templateUrl: './todos-viewer.component.html',
  styleUrls: ['./todos-viewer.component.css']
})
export class TodosViewerComponent implements OnDestroy {
  todos: Todo[] = [];
  private todosUpdateSubscription: Subscription | undefined;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todosUpdateSubscription = this.todoService.todosUpdate
      .subscribe(todos => this.todos = todos);

    this.todoService.raiseTodosUpdate();
  }

  ngOnDestroy(): void {
    this.todosUpdateSubscription?.unsubscribe();
  }
}
