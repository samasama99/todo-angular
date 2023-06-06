import { HttpClient, } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvService } from './env.service';
import { Store } from '@ngrx/store';
import { loadTodos } from './todo-state/todo.actions';


export type User = {
  id: number;
  name: string;
}

export type LogObj = {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  is_logged() {
    return this.logged;
  }

  private envService = inject(EnvService);
  private store = inject(Store);
  private url_base = this.envService.apiUrl;
  user: User = { name: '', id: 0 };
  logged: boolean = false;
  jwt: string = "";
  httpClient = inject(HttpClient);


  getAuthorizationToken() {
    return this.jwt;
  }

  login(user: LogObj) {
    console.log('login with', user);
    return this.httpClient.post<any>(this.url_base + '/login', {
      'username': user.username,
      'password': user.password
    })
      .subscribe(res => {
        this.logged = true;
        this.jwt = res.access_token;
        this.user.name = res.name;
        this.user.id = res.id;
        this.store.dispatch(loadTodos());
      }, (err) => console.table(err));
  }
}
