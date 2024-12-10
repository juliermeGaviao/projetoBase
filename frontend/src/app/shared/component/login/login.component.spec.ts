import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let mockRouter: any;
  let mockAuthService: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn(),
    };

    mockAuthService = {
      login: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnThis(),
        subscribe: jest.fn(),
      }),
    };

    component = new LoginComponent(mockRouter, mockAuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get token from localStorage on initialization', () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('mockToken');
    component.ngOnInit();
    expect(component.token).toBe('mockToken');
  });

  it('should navigate to home if token exists', () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('mockToken');
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should call getAdressToPromoveTicket if token does not exist', () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue(null);
    const spy = jest.spyOn(component, 'getAdressToPromoveTicket');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call authService.login in getAdressToPromoveTicket', () => {
    component.getAdressToPromoveTicket();
    expect(mockAuthService.login).toHaveBeenCalled();
  });

 
});
