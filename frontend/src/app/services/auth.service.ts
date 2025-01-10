import { environment } from '../../environments/environment'

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UsuarioResponse } from '../interfaces/usuarioResponse.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

readonly apiurl: string = environment.apiUrl

constructor(private readonly httpClient: HttpClient) { }


  /**
   * Recebi o ticket do SCA2 e envio para o backend para verificar se o ticket é valido e retorna o JWT Token.
   * @param ticket
   * @returns Token JWT valido para proximas requisicoes.
   * Ex: http://localhost:80?ticket=ST-40-8Xor8Cv-j1wn9BXKYusCyhADa2ksso2-7b97658c8d-xpto
   */
  token(ticket: string) {
    return this.httpClient.post<UsuarioResponse>(this.apiurl + 'sso/token', ticket)
  }

  /**
   * Obter um endereço para realizar o login no SCA2.
   * @returns endereço para o SCA2 com a finalizadade de receber um endereço contendo o ticket.
   * Ex: https://t1-sso2-scaibama.estaleiro.serpro.gov.br/cas/login?service=http%3A%2F%2Flocalhost.localdomain%2Flaf%2Fticket
   */
  login() {
    return this.httpClient.get(environment.apiUrl + 'sso/login', { responseType: 'text' })
  }

  logout()  {
    return this.httpClient.get(this.apiurl + 'sso/logout', { responseType: 'text' })
  }

}
