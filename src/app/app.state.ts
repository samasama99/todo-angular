import { Todo } from "./todo-state/todo.model";
import { AuthState } from "./auth-state/auth.reducer";

export interface AppState {
  todos: Todo[];
  auth: AuthState;
}

export const initialState: AppState = {
  todos: [],
  auth: { user: null, token: null, error: null }
};
