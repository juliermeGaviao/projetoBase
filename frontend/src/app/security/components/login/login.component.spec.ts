import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: any;
  let mockAuthService: any;
  let mockLoginService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };
    mockAuthService = {
      token: jest.fn(),
      login: jest.fn(),
    };
    mockLoginService = {
      setToken: jest.fn(),
      setUsuarioResponse: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: LoginService, useValue: mockLoginService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    Object.defineProperty(window, 'location', {
      value: { search: '', href: '' },
      writable: true,
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call verifyTicketAndGetToken if ticket is present', () => {
      window.location.search = '?ticket=12345';
      mockAuthService.token.mockReturnValue(of({ sessionToken: 'validToken', usuario: { nome: 'Test User' } }));
      jest.spyOn(component, 'verifyTicketAndGetToken');
      jest.spyOn(component, 'redirectToSCA2Login');

      component.ngOnInit();

      expect(component.ticket).toBe('12345');
      expect(component.verifyTicketAndGetToken).toHaveBeenCalled();
      expect(component.redirectToSCA2Login).not.toHaveBeenCalled();
    });

    it('should call redirectToSCA2Login if ticket is not present', () => {
      window.location.search = '';
      mockAuthService.login.mockReturnValue(of('http://example.com/login'));
      jest.spyOn(component, 'verifyTicketAndGetToken');
      jest.spyOn(component, 'redirectToSCA2Login');

      component.ngOnInit();

      expect(component.ticket).toBeNull();
      expect(component.verifyTicketAndGetToken).not.toHaveBeenCalled();
      expect(component.redirectToSCA2Login).toHaveBeenCalled();
    });
  });

  describe('verifyTicketAndGetToken', () => {
    it('should store token, set user data, and navigate to dashboard if response is valid', () => {
      const mockResponse = { sessionToken: 'validToken', usuario: { nome: 'Test User' } };
      mockAuthService.token.mockReturnValue(of(mockResponse));
      jest.spyOn(mockLoginService, 'setToken');
      jest.spyOn(mockLoginService, 'setUsuarioResponse');
      jest.spyOn(mockRouter, 'navigate');

      component.ticket = '12345';
      component.verifyTicketAndGetToken();

      expect(mockAuthService.token).toHaveBeenCalledWith('12345');
      expect(localStorage.getItem('token_SCA2')).toBe('validToken');
      expect(localStorage.getItem('usuarioResponse_SCA2')).toBe(JSON.stringify(mockResponse));
      expect(mockLoginService.setToken).toHaveBeenCalledWith('validToken');
      expect(mockLoginService.setUsuarioResponse).toHaveBeenCalledWith(mockResponse);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['dashboard']);
    });

    it('should call redirectToSCA2Login if response is null', () => {
      mockAuthService.token.mockReturnValue(of(null));
      jest.spyOn(component, 'redirectToSCA2Login');

      component.ticket = '12345';
      component.verifyTicketAndGetToken();

      expect(mockAuthService.token).toHaveBeenCalledWith('12345');
      expect(component.redirectToSCA2Login).toHaveBeenCalled();
    });

    it('should call redirectToSCA2Login on error', () => {
      mockAuthService.token.mockReturnValue(throwError(() => new Error('Error')));
      jest.spyOn(component, 'redirectToSCA2Login');

      component.ticket = '12345';
      component.verifyTicketAndGetToken();

      expect(mockAuthService.token).toHaveBeenCalledWith('12345');
      expect(component.redirectToSCA2Login).toHaveBeenCalled();
    });
  });

  describe('redirectToSCA2Login', () => {
    it('should redirect to login URL if login is successful', () => {
      const mockLoginUrl = 'http://example.com/login';
      mockAuthService.login.mockReturnValue(of(mockLoginUrl));

      component.redirectToSCA2Login();

      expect(mockAuthService.login).toHaveBeenCalled();
      expect(window.location.href).toBe(mockLoginUrl);
    });

    it('should navigate to error page if login fails', () => {
      mockAuthService.login.mockReturnValue(throwError(() => new Error('Error')));
      jest.spyOn(mockRouter, 'navigate');

      component.redirectToSCA2Login();

      expect(mockAuthService.login).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['error-page']);
    });
  });
});
