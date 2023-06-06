
// import { createReducer, on } from '@ngrx/store';
// import { Todo } from './todo.model';
// import { addTodo, deleteTodo, updateTodo, loadTodosSuccess } from './todo.actions';

// export interface TodoState {
//   todos: Todo[];
// }

// export const initialState: TodoState = {
//   todos: []
// };

// export const todoReducer = createReducer(
//   initialState,
//   on(addTodo, (state, { todo }) => ({ ...state, todos: [...state.todos, todo] })),
//   on(deleteTodo, (state, { id }) => ({ ...state, todos: state.todos.filter(todo => todo.id !== id) })),
//   on(updateTodo, (state, { todo }) => ({
//     ...state,
//     todos: state.todos.map(item => item.id === todo.id ? { ...item, done: todo.done } : item)
//   })),
//   on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos: [...todos] }))
// );
import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import {
  addTodo,
  addTodoSuccess,
  deleteTodo,
  deleteTodoSuccess,
  updateTodo,
  updateTodoSuccess,
  loadTodosSuccess,
} from './todo.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: []
};

export const todoReducer = createReducer(
  initialState,
  on(addTodoSuccess, (state, { todo }) => ({ ...state, todos: [...state.todos, todo] })),
  on(deleteTodoSuccess, (state, { id }) => ({ ...state, todos: state.todos.filter(todo => todo.id !== id) })),
  on(updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(item => item.id === todo.id ? { ...item, done: todo.done } : item)
  })),
  on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos: [...todos] }))
);
