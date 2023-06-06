// import { Component, OnDestroy, inject } from '@angular/core';
// import { Observable, Subscription } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { AppState } from '../app.state';
// import { selectAllTodos } from '../todo-state/todo.selectors';
// import { Store } from '@ngrx/store';
// import { Todo } from '../todo-state/todo.model';
// import { TodoService } from '../todo.service';

// @Component({
//   selector: 'app-todos-viewer',
//   templateUrl: './todos-viewer.component.html',
//   styleUrls: ['./todos-viewer.component.css']
// })
// export class TodosViewerComponent {

//   todos$: Observable<Todo[]> = this.store.select(selectAllTodos);

//   constructor(private store: Store<AppState>, private todoService: TodoService) { }

//   ngOnInit() {
//     this.todoService.getTodos();
//   }

//   addTodo() {
//     this.todoService.addTodo('New Todo');
//   }

//   deleteTodo(id: number) {
//     this.todoService.deleteTodo(id);
//   }
//   // todos$: Observable<Todo[]> | undefined;
//   // // private todos$ = Observable<Todo[]>;
//   // private todoService = inject(TodoService);

//   // ngOnInit(): void {
//   //   // this.todos$ = this.todoService.getTodos();
//   //   this.todos$ = this.todoService
//   //     .getTodos()
//   //     .pipe(map(todos => todos.sort((c, n) => n.id - c.id)));
//   //   // this.todosUpdateSubscription = this.todoService.todos$
//   //   //   .subscribe(todos => this.todos = todos);

//   //   // this.todoService.raiseTodosUpdate();
//   // }


//   // // private todosUpdateSubscription: Subscription | undefined;
//   // // ngOnDestroy(): void {
//   // //   this.todosUpdateSubscription?.unsubscribe();
//   // // }
// }



import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Todo } from '../todo-state/todo.model';
import { addTodo, deleteTodo, updateTodo } from '../todo-state/todo.actions';
import { selectAllTodos } from '../todo-state/todo.selectors';


@Component({
  selector: 'app-todos-viewer',
  templateUrl: './todos-viewer.component.html',
  styleUrls: ['./todos-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosViewerComponent {

  todos$;

  constructor(private store: Store<AppState>) {
    this.todos$ = store.select(selectAllTodos);
  }

  addTodo(text: string) {
    this.store.dispatch(addTodo({ todo: { text, done: false } }));
  }

  deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }

  updateTodoState(todo: Todo) {
    this.store.dispatch(updateTodo({ todo: { ...todo, done: !todo.done } }));
  }

}


