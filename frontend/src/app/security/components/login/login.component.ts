import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  template: ''
})
export class LoginComponent implements OnInit {

  ticket: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly loginService: LoginService
  ) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    this.ticket = urlParams.get('ticket');

    if (this.ticket) {
      this.verifyTicketAndGetToken();
    } else {
      this.redirectToSCA2Login();
    }
  }

  verifyTicketAndGetToken() {
    this.authService.token(this.ticket)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if (response) {
            localStorage.setItem('token_SCA2', response.sessionToken);
            localStorage.setItem('usuarioResponse_SCA2', JSON.stringify(response));
            this.loginService.setToken(response.sessionToken);
            this.loginService.setUsuarioResponse(response);
            this.router.navigate(['dashboard']);
          } else {
            this.redirectToSCA2Login();
          }
        },
        error: () => {
          this.redirectToSCA2Login();
        }
      });
  }

  redirectToSCA2Login() {
    this.authService.login()
      .pipe(take(1))
      .subscribe({
        next: (loginUrl: string) => {
          if (loginUrl) {
            window.location.href = loginUrl;
          }
        },
        error: () => {
          this.router.navigate(['error-page']);
        }
      });
  }
}
