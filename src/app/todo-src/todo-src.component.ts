import { Component } from '@angular/core';
import { Todo, TodoService } from '../todo.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-todo-src',
  templateUrl: './todo-src.component.html',
  styleUrls: ['./todo-src.component.css']
})
export class TodoSrcComponent {

  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  deleteTodo(id: Guid) {
    console.log("deleteEvent with id ", id);
    this.todoService.deleteTodo(id);
    this.updateTodo();
  }

  addTodo(text: string) {
    this.todoService.addTodo(text);
    this.updateTodo();
  }

  updateState(id: Guid) {
    const todo = this.todos.find(todo => todo.id == id);
    console.log(id, todo?.state);
    if (todo) todo.state = !todo.state;
  }

  updateTodo() {
    this.todos = this.todoService.getTodos();
  }

}
