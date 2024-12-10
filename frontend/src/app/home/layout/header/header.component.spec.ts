import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedService } from '../../../services/shared.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let loginService: LoginService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        AuthService,
        LoginService,
        SharedService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    loginService = TestBed.inject(LoginService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the logout modal when onLogout is called', () => {
    component.showModalLogout = true;
    component.onLogout();
    expect(component.showModalLogout).toBeFalsy();
  });

  it('should call authService.logout and loginService.clear on logout', () => {
    jest.spyOn(authService, 'logout').mockReturnValue(of('http://localhost:4200/login'));
    jest.spyOn(loginService, 'clear');

    component.onLogout();

    expect(authService.logout).toHaveBeenCalled();
    expect(loginService.clear).toHaveBeenCalled();
  });

  
});
