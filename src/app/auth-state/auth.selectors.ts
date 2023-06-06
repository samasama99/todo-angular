import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Get the auth feature state
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Select the logged-in status
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => !!authState.user
);

// Select the user
export const selectUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.user
);

export const selectToken = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.token
);
