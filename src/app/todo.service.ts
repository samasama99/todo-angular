// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { AuthService } from './auth.service';
// import { EnvService } from './env.service';
// import { Todo } from './todo-state/todo.model';

// // export type Todo = {
// //   id: number;
// //   text: string;
// //   done: Boolean;
// //   // createdAt: Date;
// // };

// @Injectable({
//   providedIn: 'root'
// })
// export class TodoService {
//   private httpClient = inject(HttpClient);
//   private envService = inject(EnvService);
//   private url_base = this.envService.apiUrl;
//   private todos$ = new BehaviorSubject<Todo[]>([]);

//   private authService = inject(AuthService);

//   getTodos(): Observable<Todo[]> {
//     this.httpClient.get<Todo[]>(this.url_base + "/task/" + this.authService.user.id).subscribe((todos) => {
//       this.todos$.next(todos);
//     });
//     return this.todos$.asObservable();
//   }

//   addTodo(text: string) {
//     this.httpClient.post<Todo>(this.url_base + "/task/1", {
//       text: text,
//       done: false
//     }).subscribe((todo) => {
//       this.todos$.next([...this.todos$.value, todo]);
//     });
//   }

// deleteTodo(id: number) {
//   this.httpClient.delete<number>(this.url_base + "/task/" + id).subscribe((id: number) => {
//     this.todos$.next([...this.todos$.value.filter(todo => todo.id !== id)])
//   });
// }

// updateTodo(id: number, done: boolean) {
//   this.httpClient.patch<Todo>(this.url_base + "/task/" + id, null, {
//     params: {
//       'done': done
//     }
//   }).subscribe((updatedTodo) => {
//     const todo = this.todos$.value.find(todo => todo.id == updatedTodo.id);
//     if (todo)
//       todo.done = updatedTodo.done;
//   });
// }

// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Todo } from './todo-state/todo.model';
import { AppState } from './app.state';
import { addTodo, deleteTodo, loadTodosSuccess, updateTodo } from './todo-state/todo.actions';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url_base = 'http://localhost:3001/task/'; // Update the base URL according to your API endpoint
  // private todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(private httpClient: HttpClient) { }

  getTodos() {
    return this.httpClient.get<Todo[]>(this.url_base + '1')
    //   .subscribe((todos) => {
    //   this.store.dispatch(loadTodosSuccess({ todos }));
    // });
    // return this.todos$.asObservable();
  }

  addTodo(text: string) {
    return this.httpClient.post<Todo>(this.url_base + '1', { text, done: false })
    // .subscribe((todo) => {
    //   this.store.dispatch(addTodo({ todo }));
    // });
  }

  deleteTodo(id: number) {
    return this.httpClient.delete<number>(`${this.url_base}${id}`);
    //   .subscribe(() => {
    //   this.store.dispatch(deleteTodo({ id }));
    // });
  }

  updateTodoStatus(id: number, done: boolean) {
    return this.httpClient.patch<Todo>(`${this.url_base}${id}`, { done: done }, {
      params: {
        done
      }
    });
    // .subscribe((updatedTodo) => {
    //   this.store.dispatch(updateTodo({ todo: updatedTodo }));
    // });
  }
}
