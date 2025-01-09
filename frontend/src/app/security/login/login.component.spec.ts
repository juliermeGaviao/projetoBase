import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { of, throwError } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { LoginService } from '../../services/login.service'
import { LoginComponent } from './login.component'
import { RouterTestingModule } from '@angular/router/testing'
import { UsuarioResponse } from '../../interfaces/usuarioResponse.interface'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let authService: any
  let loginService: any
  let router: Router
  const ticket: string = 'ST-1235-ktTmFoxSI0ajIivlq60dyLPCMmwsso2-bf65d944-9r8n6'
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [AuthService, LoginService]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)

    authService = TestBed.inject(AuthService)
    loginService = TestBed.inject(LoginService)
    router = TestBed.inject(Router)

    component = fixture.componentInstance
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should go home because has tickect is authenticated', () => {
    jest.spyOn(loginService, 'hasTicket').mockReturnValue(true)
    jest.spyOn(loginService, 'getTicket').mockReturnValue(ticket)
    jest.spyOn(loginService, 'isAuthenticated').mockReturnValue(true)

    const navigateSpy = jest.spyOn(router, 'navigate')

    fixture.ngZone?.run(() => {
      component.ngOnInit()
    })

    expect(navigateSpy).toHaveBeenCalledWith(['home'])
  })

  it('should get token because it has ticket but not authenticated', () => {
    jest.spyOn(loginService, 'hasTicket').mockReturnValue(true)
    jest.spyOn(loginService, 'getTicket').mockReturnValue(ticket)
    jest.spyOn(loginService, 'isAuthenticated').mockReturnValue(false)
    jest.spyOn(authService, 'token').mockReturnValue(of(userResponse))
    jest.spyOn(loginService, 'setUsuarioResponse')

    const navigateSpy = jest.spyOn(router, 'navigate')

    fixture.ngZone?.run(() => {
      component.ngOnInit()
    })

    expect(navigateSpy).toHaveBeenCalledWith(['home'])
  })

  it('should go to erro page because getting token fails', () => {
    jest.spyOn(loginService, 'hasTicket').mockReturnValue(true)
    jest.spyOn(loginService, 'getTicket').mockReturnValue(ticket)
    jest.spyOn(loginService, 'isAuthenticated').mockReturnValue(false)
    jest.spyOn(loginService, 'clear')
    jest.spyOn(authService, 'token').mockReturnValue(throwError(() => new Error()))

    const navigateSpy = jest.spyOn(router, 'navigate')

    fixture.ngZone?.run(() => {
      component.ngOnInit()
    })

    expect(navigateSpy).toHaveBeenCalledWith(['/error-page'])
  })

  it('should go to erro page because getting token fails', () => {
    jest.spyOn(loginService, 'hasTicket').mockReturnValue(true)
    jest.spyOn(loginService, 'getTicket').mockReturnValue(ticket)
    jest.spyOn(loginService, 'isAuthenticated').mockReturnValue(false)
    jest.spyOn(loginService, 'clear')
    jest.spyOn(authService, 'token').mockReturnValue(throwError(() => new Error()))

    const navigateSpy = jest.spyOn(router, 'navigate')

    fixture.ngZone?.run(() => {
      component.ngOnInit()
    })

    expect(navigateSpy).toHaveBeenCalledWith(['/error-page'])
  })

  it('should not get ticket', () => {
    jest.spyOn(loginService, 'hasTicket').mockReturnValue(false)
    jest.spyOn(router, 'url', 'get').mockReturnValue(null)

    const result: string = component.getTicket()

    expect(result).toBeNull()
  })

  it('should not get ticket', () => {
    jest.spyOn(loginService, 'hasTicket').mockReturnValue(false)
    jest.spyOn(router, 'url', 'get').mockReturnValue('?ticket=' + ticket)

    const result: string = component.getTicket()

    expect(result).toEqual(ticket)
  })

  it('should go to SCA because theres no ticket at url', () => {
    jest.spyOn(component, 'getTicket').mockReturnValue(null)
    jest.spyOn(loginService, 'isAuthenticated').mockReturnValue(false)

    component.ngOnInit()

    expect(component).toBeTruthy()
  })

  it('should go to SCA', () => {
    const scaUrl: string = 'https://homsca2.ibama.serpro.gov.br/sca2sessao/api/v2/sessao/login?service=http%3A%2F%2F127.0.0.1%2Fbase%2Flogin'
    jest.spyOn(authService, 'login').mockReturnValue(of(scaUrl))
    window = Object.create(window)
    Object.defineProperty(window, 'location', { value: { href: scaUrl }, writable: true })

    component.redirectToSCA2Login()

    expect(window.location.href).toEqual(scaUrl)
  })

  it('should fails on getting login url', () => {
    jest.spyOn(authService, 'login').mockReturnValue(throwError(() => new Error()))

    const navigateSpy = jest.spyOn(router, 'navigate')

    fixture.ngZone?.run(() => {
      component.redirectToSCA2Login()
    })

    expect(navigateSpy).toHaveBeenCalledWith(['/error-page'])
  })

})
