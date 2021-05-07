import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  setBalance(id: number, balance: number): any {
    return this.http.post<any>(environment.dev + `user/${id}/balance`, balance);
  }

  setAlert(id: number, alert: number): any {
    return this.http.post<any>(environment.dev + `user/${id}/alert`, alert);
  }

  getUser(id: any): any {
    return this.http.get<any>(environment.dev + `user/${id}`);
  }

  updateUser(user: any, id: any): any {
    return this.http.put<any>(environment.dev + `user/update/${id}`, user);
  }
}
