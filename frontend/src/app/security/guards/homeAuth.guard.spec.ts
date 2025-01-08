import { TestBed } from '@angular/core/testing'
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

import { HomeAuthGuard } from './homeAuth.guard'
import { LoginService } from '../../services/login.service'

describe('HomeGuardGuard', () => {
  let loginService: LoginService

  const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => HomeAuthGuard(...guardParameters))

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [LoginService]
    })

    loginService = TestBed.inject(LoginService)
  })

  it('should be created', () => {
    expect(executeGuard).toBeTruthy()
  })

  it('should be authenticated', () => {
    jest.spyOn(loginService, 'isAuthenticated').mockReturnValue(true)

    const route: ActivatedRouteSnapshot = {} as any
    const state: RouterStateSnapshot = {} as any

    expect(executeGuard(route, state)).toBeTruthy()
  })

  it('should not be authenticated', () => {
    jest.spyOn(loginService, 'isAuthenticated').mockReturnValue(false)

    const route: ActivatedRouteSnapshot = {} as any
    const state: RouterStateSnapshot = {} as any
    const router: Router = TestBed.inject(Router)
    const navigateSpy = jest.spyOn(router, 'navigate')

    expect(executeGuard(route, state)).toBeFalsy()

    expect(navigateSpy).toHaveBeenCalledWith(['login'])
  })

})
