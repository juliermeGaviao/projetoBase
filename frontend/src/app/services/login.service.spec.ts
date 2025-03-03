import { TestBed } from '@angular/core/testing'
import { LoginService } from './login.service'
import { UsuarioResponse } from '../interfaces/usuarioResponse.interface'


describe('LoginService', () => {
  let service: LoginService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
    })
    service = TestBed.inject(LoginService)

    localStorage.clear()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should set and get ticket', () => {
    expect(service.getTicket()).toBeNull()
  })

  it('should set and get UsuarioResponse', () => {
    const mockUserResponse: UsuarioResponse = { sessionToken: 'abc123' } as UsuarioResponse
    service.setUsuarioResponse(mockUserResponse)

    expect(service.getUsuarioResponse()).toEqual(mockUserResponse)
  })

  it('should retrieve UsuarioResponse from localStorage if BehaviorSubject is null', () => {
    const mockUserResponse: UsuarioResponse = { sessionToken: 'abc123' } as UsuarioResponse
    localStorage.setItem('usuarioResponse_SCA2', JSON.stringify(mockUserResponse))

    expect(service.getUsuarioResponse()).toEqual(mockUserResponse)
  })

  it('should clear UsuarioResponse', () => {
    const mockUserResponse: UsuarioResponse = { sessionToken: 'abc123' } as UsuarioResponse
    service.setUsuarioResponse(mockUserResponse)
    service.clearUsuarioResponse()

    expect(service.getUsuarioResponse()).toBeNull()
  })

  it('should check if user is authenticated', () => {
    expect(service.isAuthenticated()).toBe(false)

    localStorage.setItem('token_SCA2', 'validToken')
    expect(service.isAuthenticated()).toBe(true)
  })

  it('should has ticket', () => {
    localStorage.setItem('ticket_SCA2', 'testTicket')
    expect(service.hasTicket()).toBe(true)
  })

  it('should clear all data', () => {
    localStorage.setItem('token_SCA2', 'validToken')
    localStorage.setItem('ticket_SCA2', 'testTicket')
    localStorage.setItem('usuarioResponse_SCA2', JSON.stringify({ sessionToken: 'abc123' }))

    service.clear()

    expect(service.getTicket()).toBeNull()
    expect(service.getUsuarioResponse()).toBeNull()
    expect(localStorage.getItem('token_SCA2')).toBeNull()
    expect(localStorage.getItem('ticket_SCA2')).toBeNull()
    expect(localStorage.getItem('usuarioResponse_SCA2')).toBeNull()
  })

  it('should not break when UsuarioResponse is null in localStorage', () => {
    localStorage.setItem('usuarioResponse_SCA2', null)
    expect(service.getUsuarioResponse()).toBeNull()
  })

  it('should disable because theres no role', () => {
      const mockUserResponse: UsuarioResponse = { sessionToken: 'abc123' } as UsuarioResponse

      service.setUsuarioResponse(mockUserResponse)

      const result: boolean = service.disable('ROLE_BASE_VIS_FUNC_VIS_ACESSAR')

      expect(result).toBeTruthy()
  })

  it('should disable because theres no role', () => {
    const mockUserResponse: UsuarioResponse = { usuario: { roles: [] } } as UsuarioResponse

    service.setUsuarioResponse(mockUserResponse)

    const result: boolean = service.disable('ROLE_BASE_VIS_FUNC_VIS_ACESSAR')

    expect(result).toBeTruthy()
  })

  it('should disable because theres no role', () => {
    const mockUserResponse: UsuarioResponse = { usuario: { roles: [ { authority: 'ROLE_BASE_ADM_FUNC_CAD_CADASTRAR' } ] } } as UsuarioResponse

    service.setUsuarioResponse(mockUserResponse)

    const result: boolean = service.disable('ROLE_BASE_VIS_FUNC_VIS_ACESSAR')

    expect(result).toBeTruthy()
  })

  it('should not disable because theres no role', () => {
    const mockUserResponse: UsuarioResponse = { usuario: { roles: [ { authority: 'ROLE_BASE_VIS_FUNC_VIS_ACESSAR' } ] } } as UsuarioResponse

    service.setUsuarioResponse(mockUserResponse)

    const result: boolean = service.disable('ROLE_BASE_VIS_FUNC_VIS_ACESSAR')

    expect(result).toBeNull()
  })

})
