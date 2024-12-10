import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { UsuarioResponse } from 'src/app/interfaces/usuarioResponse.interface';
import { AuthService } from '../../../services/auth.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {

  ticket: string;
  token: string;
  isAuthenticated: boolean = false;
  messageError: string = 'Estamos constrangidos em te ver por aqui';
  descriptionError: string = 'Talvez você tenha se equivocado ao digitar o endereço URL ou quem sabe tenhamos cometido uma falha por aqui.';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly loginService: LoginService
  ) {}

  ngOnInit() {
    let url = this.router.url;

    if (url?.includes('?ticket=')) {
      this.ticket = url.substring(url.indexOf('=') + 1, url.length);
      localStorage.setItem('ticket_SCA2', this.ticket);
      this.loginService.setTicket(this.ticket);
    }   

    if(this.ticket != null) {
      this.getToken();
    } else {
      this.router.navigate(['/error-page']);
    }
  }

  getToken() {
    let hasToken: boolean = false;
  
    this.authService
      .token(this.ticket)
      .pipe(
        take(1),
        finalize(() => {
          if (!hasToken) {
            this.router.navigate(['/error-page']);
          }
        })
      )
      .subscribe({
        next: (usuario: UsuarioResponse) => {
          if (usuario != null) {
            hasToken = true;
  
            localStorage.setItem('token_SCA2', usuario.sessionToken);
            localStorage.setItem('usuarioResponse_SCA2', JSON.stringify(usuario));
  
            this.loginService.setToken(usuario.sessionToken);
            this.loginService.setUsuarioResponse(usuario);
            this.router.navigate(['home']);
          }
        },
        error: (error) => {
          hasToken = false;
          this.messageError = error.status;
          this.descriptionError = error.message || error.error;
  
          localStorage.removeItem('token_SCA2');
          localStorage.removeItem('ticket_SCA2');
          localStorage.removeItem('usuarioResponse_SCA2');
  
          this.loginService.setTicket(null);
          this.loginService.clearUsuarioResponse();
          this.isAuthenticated = false;
          this.loginService.setToken(null);
  
          this.router.navigate(['/error-page']);
        },
      });
  }
  
}
