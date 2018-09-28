import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler, HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthService} from './auth-service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authData = this.authService.getLoginData();
    if (authData) {
      const authRequest = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(authData.email + ':' + authData.password)
        })
      });
      return next.handle(authRequest);
    } else {
      const authToken = this.authService.getToken();
      const authRequest = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      });
      return next.handle(authRequest);
    }
  }
}
