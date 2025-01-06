import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { of, throwError } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { LoginService } from '../../services/login.service'
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let mockRouter: any
  let mockAuthService: any
  let mockLoginService: any

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    }

    mockAuthService = {
      token: jest.fn(),
      login: jest.fn(),
    }

    mockLoginService = {
      setToken: jest.fn(),
      setUsuarioResponse: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: LoginService, useValue: mockLoginService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance

    Object.defineProperty(window, 'location', {
      value: { search: '', href: '' },
      writable: true,
    })
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  describe('redirectToSCA2Login', () => {
    it('should redirect to login URL if login is successful', () => {
      const mockLoginUrl = 'http://example.com/login'
      mockAuthService.login.mockReturnValue(of(mockLoginUrl))

      component.redirectToSCA2Login()

      expect(mockAuthService.login).toHaveBeenCalled()
      expect(window.location.href).toBe(mockLoginUrl)
    })

    it('should navigate to error page if login fails', () => {
      mockAuthService.login.mockReturnValue(throwError(() => new Error('Error')))
      jest.spyOn(mockRouter, 'navigate')

      component.redirectToSCA2Login()

      expect(mockAuthService.login).toHaveBeenCalled()
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/error-page'])
    })
  })
})
