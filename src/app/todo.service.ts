import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

export type Todo = {
  id: Guid;
  text: string;
  state: Boolean;
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [
    { id: this.generateUniqueId(), text: 'todo 1', state: false },
    { id: this.generateUniqueId(), text: 'todo 2', state: false },
    { id: this.generateUniqueId(), text: 'todo 3', state: false },
    { id: this.generateUniqueId(), text: 'todo 4', state: false },
    { id: this.generateUniqueId(), text: 'todo 5', state: false },
  ]

  constructor() { }

  private generateUniqueId(): Guid {
    return Guid.create();
  }

  getTodos() {
    return this.todos;
  }

  addTodo(text: string) {
    this.todos.push({
      id: this.generateUniqueId(),
      text: text,
      state: false
    })
  }

  deleteTodo(id: Guid) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
