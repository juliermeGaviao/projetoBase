import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LoginService } from '../services/login.service';

export const homeAuthGuard: CanActivateFn = (route, state) => {
  if (inject(LoginService).isAuthenticated()) {
    return true;
  }
  inject(Router).navigate(['error-page']);
  return false;
};
