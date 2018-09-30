import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import {AuthData} from './auth-data.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private authData: {
    email: string,
    password: string
  };
  private signinData: {
    email: string,
    password: string,
    name: string,
    services: string
  };
  private user: any;

  constructor(private http: HttpClient, private router: Router) {}

  getUserData() {
    return this.user;
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getLoginData() {
    return this.authData;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const signinData = `access_token=bj9OLPpFxbcMvcsIQvLucBfAvCQLiv2d&email=${email}&password=${password}`;

    this.http
      .post(BACKEND_URL + '/users', signinData)
      .subscribe(
      () => {
        this.login(email, password)
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
    this.authData = {
      email: email,
      password: password
    };
    this.http
      .post<any>( // { token: string; expiresIn: number; userId: string }
        BACKEND_URL + '/auth',
        'access_token=bj9OLPpFxbcMvcsIQvLucBfAvCQLiv2d'
      )
      .subscribe(
        response => {
          // console.log(response);
          // this.router.navigate(['/']);
          const token = response.token;
          this.token = token;
          if (token) {
            // const expiresInDuration = response.expiresIn;
            // this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            // const now = new Date();
            // const expirationDate = new Date(
            //   now.getTime() + expiresInDuration * 1000
            // );
            // console.log(expirationDate);
            this.saveAuthData(token, this.userId);
            console.log(response);
            this.user = response;
            this.router.navigate(['/tasks-list']);
          }
        },
        error => {
          console.log(error);
          this.createUser(this.authData.email, this.authData.password);
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    // const now = new Date();
    // const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // if (expiresIn > 0) {
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.userId = authInformation.userId;
    // this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
    // }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    // clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    // localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    // localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    // const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token) {
      return;
    }
    return {
      token: token,
      // expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
