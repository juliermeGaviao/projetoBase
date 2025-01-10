import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderComponent } from './header.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from "@angular/router"

import { SharedService } from '../../../services/shared.service'
import { of, throwError } from 'rxjs'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from '../../../services/auth.service'
import { LoginService } from '../../../services/login.service'
import { UsuarioResponse } from '../../../interfaces/usuarioResponse.interface'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let authService: AuthService
  let loginService: LoginService
  let sharedService: SharedService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        AuthService,
        LoginService,
        SharedService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    authService = TestBed.inject(AuthService)
    loginService = TestBed.inject(LoginService)
    sharedService = TestBed.inject(SharedService)

    fixture.detectChanges()

    Object.defineProperty(window, 'location', {
      value: { search: '', href: '' },
      writable: true,
    })
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should inject user at login service', () => {
    const userResponse: UsuarioResponse = {
      "sessionToken": "TOKEN_SCA2",
      "service": "http://127.0.0.1/laf/ticket",
      "usuario": {
        "login": "123456789",
        "nome": "Angular User",
        "numPessoa": 123456,
        "email": "teste@teste",
        "usuarioInterno": true,
        "perfilUnidadesVinculadas": {
          "lstPerfilUnidades": []
        },
        "roles": [
          {
            "authority": "ROLE_MOD_BASE_ADMINISTRAR"
          }
        ],
        "rolesSuprimidas": {
          "certificadoA3": [],
          "govBrOuro": [],
          "govBrPrata": []
        },
        "loginVia": "USUARIO_SENHA",
        "emissorCertificadoSerpro": false,
        "tipoFuncionario": "1",
        "podeAcessarSistema": true,
        "autenticacaoMultifator": false,
        "tipoCertificado": null,
        "isRoleSuprimidaPorLoginSemCertificado": false
      }
    }

    jest.spyOn(loginService, 'getUsuarioResponse').mockReturnValue(userResponse)

    component.ngOnInit()

    expect(component.usuarioResponse).toBeDefined()
  })

  it('should inject user with no name at login service', () => {
    const userResponse: UsuarioResponse = {
      "sessionToken": "TOKEN_SCA2",
      "service": "http://127.0.0.1/laf/ticket",
      "usuario": {
        "login": "123456789",
        "nome": null,
        "numPessoa": 123456,
        "email": "teste@teste",
        "usuarioInterno": true,
        "perfilUnidadesVinculadas": {
          "lstPerfilUnidades": []
        },
        "roles": [
          {
            "authority": "ROLE_MOD_BASE_ADMINISTRAR"
          }
        ],
        "rolesSuprimidas": {
          "certificadoA3": [],
          "govBrOuro": [],
          "govBrPrata": []
        },
        "loginVia": "USUARIO_SENHA",
        "emissorCertificadoSerpro": false,
        "tipoFuncionario": "1",
        "podeAcessarSistema": true,
        "autenticacaoMultifator": false,
        "tipoCertificado": null,
        "isRoleSuprimidaPorLoginSemCertificado": false
      }
    }

    jest.spyOn(loginService, 'getUsuarioResponse').mockReturnValue(userResponse)

    component.ngOnInit()

    expect(component.usuarioResponse).toBeDefined()
  })

  it('should toogle menu', () => {
    sharedService.isOpen = true
    component.toggleMenu()

    expect(component.sharedService.isOpen).toBeFalsy()
  })

  it('should open modal', () => {
    component.showLogoutModal({_vts: null})

    expect(component).toBeTruthy()
  })

  it('should not open modal', () => {
    component.showLogoutModal(null)

    expect(component).toBeTruthy()
  })

  it('should failed because invalid URL', () => {
    jest.spyOn(authService, 'logout').mockReturnValue(of('ftp://localhost:4200/login'))

    component.onLogout()

    expect(component).toBeTruthy()
  })

  it('should call authService.logout and loginService.clear on logout', () => {
    jest.spyOn(authService, 'logout').mockReturnValue(of('http://localhost:4200/login'))
    jest.spyOn(loginService, 'clear')

    component.onLogout()

    expect(authService.logout).toHaveBeenCalled()
    expect(loginService.clear).toHaveBeenCalled()
  })

  it('should call authService.logout and loginService.clear on logout', () => {
    jest.spyOn(authService, 'logout').mockReturnValue(of('http://localhost:4200/login'))
    jest.spyOn(loginService, 'clear')

    component.onLogout()

    expect(authService.logout).toHaveBeenCalled()
    expect(loginService.clear).toHaveBeenCalled()
  })

  it('should call authService.logout and loginService.clear on logout', () => {
    jest.spyOn(authService, 'logout').mockReturnValue(throwError(() => new HttpErrorResponse({ status: 403, statusText: 'Forbidden' })))
    jest.spyOn(loginService, 'clear')

    fixture.ngZone?.run(() => {
      const router: Router = TestBed.inject(Router)
      const navigateSpy = jest.spyOn(router, 'navigate')

      component.onLogout()

      expect(loginService.clear).toHaveBeenCalled()

      expect(navigateSpy).toHaveBeenCalledWith(['login'])
    })
  })

})
