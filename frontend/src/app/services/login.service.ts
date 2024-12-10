import { Injectable } from '@angular/core';
import { UsuarioResponse } from '../interfaces/usuarioResponse.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private ticket: string;
  private token: string;
  private readonly userResponse = new BehaviorSubject<UsuarioResponse>(null);

  constructor() { }

  getTicket(): string {
    return this.ticket;
  }

  getUsuarioResponse(): UsuarioResponse {
    if(this.userResponse.getValue()) {
      return this.userResponse.getValue();
    }
    return JSON.parse(localStorage.getItem('usuarioResponse_SCA2'));
  }

  getToken(): string {
    return this.token;
  }

  setUsuarioResponse(userResponse: UsuarioResponse) {
    this.userResponse.next(userResponse);
  }

  clearUsuarioResponse() {
    this.userResponse.next(null);
  }

  setTicket(ticket: string) {
    this.ticket = ticket;
  }

  setToken(token: string) { 
    this.token = token; 
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token_SCA2') != null;
  }

  clear() {
    localStorage.removeItem('token_SCA2');
    localStorage.removeItem('ticket_SCA2');
    localStorage.removeItem('usuarioResponse_SCA2');
    this.ticket = null;
    this.token = null;
    this.userResponse.next(null);
  }
}
