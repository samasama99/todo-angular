import { createReducer, on } from '@ngrx/store';
import { User } from '../auth.service';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  token: string | null;
  error: any | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user, token }) => ({ ...state, user, token, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, user: null, token: null, error })),
  on(AuthActions.logoutSuccess, state => ({ ...state, user: null, token: null, error: null })),
  on(AuthActions.logoutFailure, (state, { error }) => ({ ...state, error }))
);
