import { inject } from '@angular/core'
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { LoginService } from '../../services/login.service'

export const HomeAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (inject(LoginService).isAuthenticated()) {
    return true
  }

  inject(Router).navigate(['login'])

  return false
}
