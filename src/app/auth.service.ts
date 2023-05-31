import { HttpClient, } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


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
  user: User = { name: '', id: 0 };
  logged: boolean = false;
  jwt: string = "";
  httpClient = inject(HttpClient);


  getAuthorizationToken() {
    return this.jwt;
  }

  logging(user: LogObj) {
    console.log('login wiht', user);
    return this.httpClient.post<any>('http://localhost:3000/login', {
      'username': user.username,
      'password': user.password
    })
      .subscribe(res => {
        this.logged = true;
        this.jwt = res.access_token;
        this.user.name = res.name;
        this.user.id = res.id;
      });
  }
}
