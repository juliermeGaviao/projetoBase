import { TicketComponent } from './ticket.component';
import { UsuarioResponse } from 'src/app/interfaces/usuarioResponse.interface';

describe('TicketComponent', () => {
  let component: TicketComponent;

  const mockRouter = {
    navigate: jest.fn(),
  };

  const mockAuthService = {
    token: jest.fn().mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        subscribe: jest.fn(),
      }),
    }),
  };

  const mockLoginService = {
    setToken: jest.fn(),
    setUsuarioResponse: jest.fn(),
    clearUsuarioResponse: jest.fn(),
    setTicket: jest.fn(),
  };

  beforeEach(() => {
    component = new TicketComponent(
      mockRouter as any,
      mockAuthService as any,
      mockLoginService as any
    );
  });

  it('should handle a successful token response', () => {
    const mockUsuario: UsuarioResponse = {
      sessionToken: 'validSessionToken',
    } as UsuarioResponse;

    const mockAuthServiceWithSuccess = {
      token: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          subscribe: jest.fn(({ next }) => {
            next(mockUsuario); // Simulando uma resposta bem-sucedida
          }),
        }),
      }),
    };

    component = new TicketComponent(
      mockRouter as any,
      mockAuthServiceWithSuccess as any,
      mockLoginService as any
    );

    component.ticket = 'validTicket';
    component.getToken();

    expect(mockAuthServiceWithSuccess.token).toHaveBeenCalledWith('validTicket');
    expect(localStorage.getItem('token_SCA2')).toBe('validSessionToken');
    expect(mockLoginService.setToken).toHaveBeenCalledWith('validSessionToken');
    expect(mockLoginService.setUsuarioResponse).toHaveBeenCalledWith(mockUsuario);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should handle an error in the token request', () => {
    const mockError = {
      status: 404,
      message: 'Token not found',
    };

    const mockAuthServiceWithError = {
      token: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          subscribe: jest.fn(({ next, error }) => {
            error(mockError); // Simulando um erro
          }),
        }),
      }),
    };

    component = new TicketComponent(
      mockRouter as any,
      mockAuthServiceWithError as any,
      mockLoginService as any
    );

    component.ticket = 'invalidTicket';
    component.getToken();

    expect(mockAuthServiceWithError.token).toHaveBeenCalledWith('invalidTicket');
    expect(component.messageError).toBe(404);
    expect(component.descriptionError).toBe('Token not found');
    expect(localStorage.getItem('token_SCA2')).toBeNull();
    expect(mockLoginService.setTicket).toHaveBeenCalledWith(null);
    expect(mockLoginService.clearUsuarioResponse).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error-page']);
  });

  
});
