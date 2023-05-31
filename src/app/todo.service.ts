import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Todo = {
  id: number;
  text: string;
  done: Boolean;
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private httpClient = inject(HttpClient);
  private todos$ = new BehaviorSubject<Todo[]>([]);

  getTodos(): Observable<Todo[]> {
    this.httpClient.get<Todo[]>("http://localhost:3000/task/1").subscribe((todos) => {
      this.todos$.next(todos);
    });
    return this.todos$.asObservable();
  }

  addTodo(text: string) {
    this.httpClient.post<Todo>("http://localhost:3000/task/1", {
      text: text,
      done: false
    }).subscribe((todo) => {
      this.todos$.next([...this.todos$.value, todo]);
    });
  }

  deleteTodo(id: number) {
    this.httpClient.delete<number>("http://localhost:3000/task/" + id).subscribe((id: number) => {
      this.todos$.next([...this.todos$.value.filter(todo => todo.id !== id)])
    });
  }

  updateTodo(id: number, done: boolean) {
    this.httpClient.patch<Todo>("http://localhost:3000/task/" + id, null, {
      params: {
        'done': done
      }
    }).subscribe((updatedTodo) => {
      const todo = this.todos$.value.find(todo => todo.id == updatedTodo.id);
      if (todo)
        todo.done = updatedTodo.done;
    });
  }

}
