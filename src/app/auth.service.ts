import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Store } from '@ngrx/store';
import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from './auth-state/auth.actions';
import { tap } from 'rxjs/operators';
import { selectUser } from './auth-state/auth.selectors';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { loadTodos } from './todo-state/todo.actions';

export type User = {
  id: number;
  name: string;
};

export type LogObj = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url_base = this.envService.apiUrl;
  constructor(
    private envService: EnvService,
    private store: Store,
    private httpClient: HttpClient
  ) {
  };

  login(user: LogObj) {
    console.log('login with', user);
    return this.httpClient.post<any>(this.url_base + '/login', {
      username: user.username,
      password: user.password
    }).pipe(
      tap(({ access_token, name, id }) => {
        this.store.dispatch(loginSuccess({ user: { id, name }, token: access_token }));
        this.store.dispatch(loadTodos());
      }),
      catchError(error => {
        this.store.dispatch(loginFailure({ error }));
        throw error;
      })
    )
  }

  logout() {
    // Implement your logout logic here, e.g., making an API call to revoke the token
    return of(null).pipe(
      tap(() => {
        this.store.dispatch(logoutSuccess());
      }),
      catchError(error => {
        this.store.dispatch(logoutFailure({ error }));
        throw error;
      })
    );
  }
}

