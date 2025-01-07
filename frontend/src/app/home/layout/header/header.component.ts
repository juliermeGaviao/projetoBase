
import { Component, OnInit } from '@angular/core'

import { UsuarioResponse } from '../../../interfaces/usuarioResponse.interface'
import { AuthService } from '../../../services/auth.service'
import { LoginService } from '../../../services/login.service'
import { SharedService } from '../../../services/shared.service'
import { Router } from '@angular/router'

/**
 * Componente do cabeçalho da aplicação.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public title: string = 'Projeto Base'
  public signature: string = 'IBAMA | Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis'
  public image = {
    src: 'assets/ibama-logo-2.png',
    alt: 'Logo de exemplo',
  }
  usuarioResponse: UsuarioResponse
  showModalLogout: boolean = false
  public links: any[] = []

  constructor(
    private readonly router: Router,
    public sharedService: SharedService,
    private readonly loginService: LoginService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioResponse = this.loginService.getUsuarioResponse()
    this.setLinks()
  }

  setLinks() {
    let name: string
    if(this.usuarioResponse) {
      name = 'Olá, ' + (this.usuarioResponse.usuario.nome ?? '')
    }
    this.links = [

      {
        name: name,
        title: 'Padrão Digital de Governo',
      }
    ]
  }

  public functions: any[] = [
   
  ]

  public toggleMenu(): void {
    this.sharedService.isOpen = !this.sharedService.isOpen
  }

  showLogoutModal(event: any) {
    if(!event?._vts) { 
      this.showModalLogout = true
    }
  }

  onLogout() {
    this.showModalLogout = false

    this.authService.logout().subscribe({
      next: res => {
        if (res.startsWith('http')) {
          this.loginService.clear()
          window.location.href = res
        } else {
          console.error('URL de logout inválida:', res)
        }
      },
      error: err => {
        console.error('Erro no logout:', err)
        this.loginService.clear()
        this.router.navigate(['login'])
      }
    })
  }

}  
