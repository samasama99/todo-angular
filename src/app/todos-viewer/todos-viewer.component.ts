import { Component, OnDestroy, inject } from '@angular/core';
import { Todo, TodoService } from '../todo.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos-viewer',
  templateUrl: './todos-viewer.component.html',
  styleUrls: ['./todos-viewer.component.css']
})
export class TodosViewerComponent {
  todos$: Observable<Todo[]> | undefined;
  // private todos$ = Observable<Todo[]>;
  private todoService = inject(TodoService);

  ngOnInit(): void {
    // this.todos$ = this.todoService.getTodos();
    this.todos$ = this.todoService
      .getTodos()
      .pipe(map(todos => todos.sort((c, n) => n.id - c.id)));
    // this.todosUpdateSubscription = this.todoService.todos$
    //   .subscribe(todos => this.todos = todos);

    // this.todoService.raiseTodosUpdate();
  }


  // private todosUpdateSubscription: Subscription | undefined;
  // ngOnDestroy(): void {
  //   this.todosUpdateSubscription?.unsubscribe();
  // }
}
