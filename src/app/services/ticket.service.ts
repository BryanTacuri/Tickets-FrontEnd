import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { environment } from 'src/environments/environment';
import { ListParams } from './ListParams.service';
import { ValueService } from './value.service';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  params = new HttpParams();
  constructor(
    private http: HttpClient,
    private listParams: ListParams,
    private valueService: ValueService
  ) {}

  getAllTickets(
    qs: String = '',
    paramsData: any = null
  ): Observable<ApiResponse> {
    let params = new HttpParams();

    if (paramsData != null) {
      params = this.listParams.GetListParams(paramsData);
    }

    let url = `${environment.apiUrl}ticket${qs}`;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.valueService.token}`,
    });
    let options = { headers, params };

    return this.http.get<ApiResponse>(url, options);
  }

  getById(qs: String, id: string): Observable<Ticket> {
    let url = `${environment.apiUrl}ticket/${id}${qs}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.valueService.token}`,
    });
    let options = { headers };

    return this.http
      .get<ApiResponse>(url, options)
      .pipe(map((res) => res.data));
  }

  addTicket(ticket: Ticket): Observable<ApiResponse> {
    let url = `${environment.apiUrl}ticket`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.valueService.token}`,
    });

    let options = { headers };

    return this.http.post<ApiResponse>(url, ticket, options);
  }

  updateTicket(ticket: Ticket, idTicket: any): Observable<ApiResponse> {
    let url = `${environment.apiUrl}ticket/${idTicket}`;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.valueService.token}`,
    });

    let options = { headers };

    return this.http.put<ApiResponse>(url, ticket, options);
  }

  deleteTicket(id: any): Observable<Ticket> {
    let url = `${environment.apiUrl}ticket/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.valueService.token}`,
    });
    let options = { headers };

    return this.http.delete<ApiResponse>(url, options).pipe(
      map((res) => {
        if (res.data == null) {
          return Error;
        }
        return res.data;
      })
    );
  }
}
