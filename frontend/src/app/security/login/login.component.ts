import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { LoginService } from '../../services/login.service'
import { UsuarioResponse } from '../../interfaces/usuarioResponse.interface'

@Component({
  selector: 'app-login',
  template: ''
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly loginService: LoginService
  ) {}

  ngOnInit() {
    const ticket: string = this.getTicket()

    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['home'])
    } else if (ticket) {
      this.getToken(ticket)
    } else {
      this.redirectToSCA2Login()
    }
  }

  getTicket(): string {
    if (this.loginService.hasTicket()) {
      return this.loginService.getTicket()
    } else {
      const url: string = this.router.url

      if (url?.includes('?ticket=')) {
        return url.substring(url.indexOf('=') + 1, url.length)
      }
    }

    return null
  }

  getToken(ticket: string) {
    this.authService.token(ticket)
      .subscribe({
        next: (usuario: UsuarioResponse) => {
          localStorage.setItem('token_SCA2', usuario.sessionToken)
          localStorage.setItem('usuarioResponse_SCA2', JSON.stringify(usuario))

          this.loginService.setUsuarioResponse(usuario)
          this.router.navigate(['home'])
        },
        error: (error: Error) => {
          this.loginService.clear()
          this.router.navigate(['/error-page'])
        },
      })
  }

  redirectToSCA2Login() {
    this.authService.login().subscribe({
      next: (loginUrl: string) => {
        window.location.href = loginUrl
      },
      error: (error: Error) => {
        this.router.navigate(['/error-page'])
      }
    })
  }
}
