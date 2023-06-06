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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthorizationToken();
    if (token) {
      const authReq = httpRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(httpRequest);
  }
}
