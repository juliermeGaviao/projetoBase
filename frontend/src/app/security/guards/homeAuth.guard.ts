import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { LoginService } from 'src/app/services/login.service'

export const HomeAuthGuard: CanActivateFn = (route, state) => {
  if (inject(LoginService).isAuthenticated()) {
    return true
  }
  inject(Router).navigate(['login'])
  return false
}
