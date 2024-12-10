
import { Component, OnInit } from '@angular/core'

import { UsuarioResponse } from 'src/app/interfaces/usuarioResponse.interface';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/shared.service';
/**
 * Componente do cabeçalho da aplicação.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public title: string = 'Bens Apreendidos'
  public signature: string = 'IBAMA | Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis'
  public image = {
    src: 'assets/ibama-logo-2.png',
    alt: 'Logo de exemplo',
  }
  usuarioResponse: UsuarioResponse
  showModalLogout: boolean = false;
  public links: any[] = []

  constructor(
    public sharedService: SharedService,
    private readonly loginService: LoginService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioResponse = this.loginService.getUsuarioResponse()
    this.setLinks();
  }

  setLinks() {
    let name: string;
    if(this.usuarioResponse) {
      name = 'Olá, ' + (this.usuarioResponse.usuario.nome ?? '');
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
      this.showModalLogout = true;
    }
  }

  onLogout() {
    this.showModalLogout = false;
    this.authService.logout().subscribe({
      next: res => {
        if (typeof res === 'string' && res.startsWith('http')) {
          this.loginService.clear();
          window.location.href = res;
        } else {
          console.error('URL de logout inválida:', res);
        }
      },
      error: err => {
        console.error('Erro no logout:', err);
      }
    })
  }
}  
