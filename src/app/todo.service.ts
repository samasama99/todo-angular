import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';

export type Todo = {
  id: number;
  text: string;
  done: Boolean;
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUpdate: Subject<Todo[]> = new Subject<Todo[]>();

  constructor(private httpClient: HttpClient) { }

  raiseTodosUpdate() {
    this.getTodos().subscribe(todos => {
      this.todosUpdate.next(todos);
    })
  }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>("http://localhost:3000/task/1");
  }

  addTodo(text: string): Observable<Todo> {
    return this.httpClient.post<Todo>("http://localhost:3000/task/1", {
      text: text,
      done: false
    });
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.httpClient.delete<Todo>("http://localhost:3000/task/" + id);
  }

  updateTodo(id: number, done: boolean): Observable<Todo> {
    return this.httpClient.patch<Todo>("http://localhost:3000/task/" + id, null, {
      params: {
        'done': done
      }
    });
  }

}
