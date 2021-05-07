import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signUp(user: any): any {
    return this.http.post<any>(environment.dev + 'user/signup', user);
  }

  signIn(user: any): any {
    return this.http.post<any>(environment.dev + 'user/signin', user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  loggout(): any {
    localStorage.removeItem('user');
    this.router.navigate(['/acceder']);

  }
}
