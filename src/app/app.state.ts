import { Todo } from "./todo-state/todo.model";


export interface AppState {
  todos: Todo[];
}

export const initialState: AppState = {
  todos: []
};
