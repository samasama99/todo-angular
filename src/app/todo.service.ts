import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';

export type Todo = {
  id: number;
  text: string;
  done: Boolean;
  createdAt: Date;
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private httpClient = inject(HttpClient);
  private envService = inject(EnvService);
  private url_base = this.envService.apiUrl;
  private todos$ = new BehaviorSubject<Todo[]>([]);

  private authService = inject(AuthService);

  getTodos(): Observable<Todo[]> {
    this.httpClient.get<Todo[]>(this.url_base + "/task/" + this.authService.user.id).subscribe((todos) => {
      this.todos$.next(todos);
    });
    return this.todos$.asObservable();
  }

  addTodo(text: string) {
    this.httpClient.post<Todo>(this.url_base + "/task/1", {
      text: text,
      done: false
    }).subscribe((todo) => {
      this.todos$.next([...this.todos$.value, todo]);
    });
  }

  deleteTodo(id: number) {
    this.httpClient.delete<number>(this.url_base + "/task/" + id).subscribe((id: number) => {
      this.todos$.next([...this.todos$.value.filter(todo => todo.id !== id)])
    });
  }

  updateTodo(id: number, done: boolean) {
    this.httpClient.patch<Todo>(this.url_base + "/task/" + id, null, {
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
