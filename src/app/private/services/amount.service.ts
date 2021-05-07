import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmountService {

  constructor(
    private http: HttpClient
  ) { }

  createAmount(amount: any): any {
    return this.http.post<any>(environment.dev + `amount/`, amount);
  }

  getAmounts(id: any): any {
    return this.http.get<any>(environment.dev + `amount/${id}`);
  }

  updateAmount(amount: any, id: number): any {
    return this.http.put<any>(environment.dev + `amount/update/${id}`, amount);
  }

  deleteAmount(id: any): any {
    console.log(id);
    return this.http.delete<any>(environment.dev + `amount/delete/${id}`);
  }
}
