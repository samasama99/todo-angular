import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  authService = inject(AuthService);

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = httpRequest.clone({
      headers: httpRequest.headers.set('Authorization', "Bearer " + this.authService.jwt)
    });
    return next.handle(newReq);
  }
}
