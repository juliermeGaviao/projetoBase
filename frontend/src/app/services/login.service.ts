import { Injectable } from '@angular/core'
import { UsuarioResponse } from '../interfaces/usuarioResponse.interface'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly userResponse = new BehaviorSubject<UsuarioResponse>(null)

  constructor() { }

  getUsuarioResponse(): UsuarioResponse {
    if(this.userResponse.getValue()) {
      return this.userResponse.getValue()
    }

    return JSON.parse(localStorage.getItem('usuarioResponse_SCA2'))
  }

  setUsuarioResponse(userResponse: UsuarioResponse) {
    this.userResponse.next(userResponse)
  }

  clearUsuarioResponse() {
    this.userResponse.next(null)
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token_SCA2')?.length > 0
  }

  hasTicket(): boolean {
    return localStorage.getItem('ticket_SCA2')?.length > 0
  }

  getTicket(): string {
    return localStorage.getItem('ticket_SCA2')
  }

  clear() {
    localStorage.removeItem('token_SCA2')
    localStorage.removeItem('ticket_SCA2')
    localStorage.removeItem('usuarioResponse_SCA2')
    this.userResponse.next(null)
  }

}
