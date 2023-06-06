
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from '../todo.service';
import {
  addTodo,
  addTodoSuccess,
  deleteTodo,
  deleteTodoSuccess,
  loadTodos,
  loadTodosSuccess,
  updateTodo,
  updateTodoSuccess,
} from './todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => loadTodosSuccess({ todos })),
        )
      )
    )
  );


  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap(({ todo }) =>
        this.todoService.addTodo(todo.text).pipe(
          map((addedTodo) => addTodoSuccess({ todo: addedTodo })),
          // catchError((error) => of(todoError({ error })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      mergeMap(({ id }) =>
        this.todoService.deleteTodo(id).pipe(
          map(() => deleteTodoSuccess({ id })),
          // catchError((error) => of(todoError({ error })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      mergeMap(({ todo }) =>
        this.todoService.updateTodoStatus(todo.id ?? -1, todo.done).pipe(
          map(() => updateTodoSuccess({ todo })),
          // catchError((error) => of(todoError({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) { }
}

