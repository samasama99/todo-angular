// import { Injectable, inject } from '@angular/core';
// import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class MyInterceptor implements HttpInterceptor {
//   authService = inject(AuthService);

//   intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const newReq = httpRequest.clone({
//       headers: httpRequest.headers.set('Authorization', "Bearer " + this.authService.jwt)
//     });
//     return next.handle(newReq);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth-state/auth.reducer';
import { selectToken, selectUser } from '../auth-state/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("called intercept")
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap(token => {
        console.log(token)
        const newReq = httpRequest.clone({
          headers: httpRequest.headers.set('Authorization', `Bearer ${token}`)
        });
        localStorage.setItem('Authorization', `Bearer ${token}`);
        return next.handle(newReq);
      })
    );
  }
}

