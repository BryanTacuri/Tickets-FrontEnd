import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(paramsData: any): Observable<any> {
    let url = `${environment.apiUrl}login`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers };

    return this.http.post<ApiResponse>(url, paramsData, options);
  }
}
