import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  isAuthenticated: boolean;

  idTicket: any;
  token: string;
  idAdmin: any;

  private isAuth = new Subject<boolean>();
  isAuthChallange$ = this.isAuth.asObservable();

  private idTicketSource = new Subject<string>();
  idTicketChallange$ = this.idTicketSource.asObservable();

  private tokenSource = new Subject<string>();
  tokenChallange$ = this.tokenSource.asObservable();

  private idAdminSource = new Subject<string>();
  idAdminChallange$ = this.idAdminSource.asObservable();

  constructor(private ss: SessionService) {
    if (this.ss.getItem('token') !== '') {
      this.token = this.ss.getItem('token');
      this.tokenSource.next(this.token);
    }

    if (this.ss.getItem('idTicket') !== '') {
      this.idTicket = this.ss.getItem('idTicket');
      this.idTicketSource.next(this.idTicket);
    }

    if (this.ss.getItem('isAuthenticated') !== '') {
      this.isAuthenticated = this.ss.getItem('isAuthenticated');
      this.isAuth.next(this.isAuthenticated);
    }

    if (this.ss.getItem('idAdmin') !== '') {
      this.idAdmin = this.ss.getItem('idAdmin');
      this.idAdminSource.next(this.idAdmin);
    }
  }

  public setToken(nombre: string) {
    this.token = nombre;
    this.ss.setItem('token', nombre);
    this.tokenSource.next(nombre);
  }

  public delToken() {
    this.token = '';
    this.ss.setItem('token', '');
    this.tokenSource.next('');
  }

  public setIsAuth(nombre: boolean) {
    this.isAuthenticated = nombre;
    this.ss.setItem('isAuthenticated', nombre);
    this.isAuth.next(nombre);
  }

  public delIsAuth() {
    this.isAuthenticated = false;
    this.ss.setItem('isAuthenticated', '');
    this.isAuth.next(false);
  }

  public setIsidTicket(id: any) {
    this.idTicket = id;
    this.ss.setItem('idTicket', id);
    this.idTicketSource.next(id);
  }

  public delidTicket() {
    this.idTicket = '';
    this.ss.setItem('idTicket', '');
    this.idTicketSource.next('');
  }

  public setIsidAdmin(id: any) {
    this.idAdmin = id;
    this.ss.setItem('idAdmin', id);
    this.idAdminSource.next(id);
  }

  public delidAdmin() {
    this.idAdmin = '';
    this.ss.setItem('idAdmin', '');
    this.idAdminSource.next('');
  }

  public CerrarSesion() {
    this.delIsAuth();

    this.delToken();

    this.delidAdmin();

    this.isAuthenticated = false;
  }
}
