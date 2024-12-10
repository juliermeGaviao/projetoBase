import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { homeAuthGuard } from './homeAuth.guard';

describe('homeGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => homeAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Router]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
