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
    const authToken = this.authService.getToken();
    const authData = this.authService.getLoginData();
    console.log(req);
    const authRequest = req.clone({
      headers: new HttpHeaders({
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        // 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(authData.email + ':' + authData.password)
      })
    });
    return next.handle(authRequest);
  }
}
