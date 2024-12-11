import { TestBed } from '@angular/core/testing'
import { CanActivateFn, Router } from '@angular/router'

import { HomeAuthGuard } from './homeAuth.guard'

describe('HomeGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => HomeAuthGuard(...guardParameters))

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Router]
    })
  })

  it('should be created', () => {
    expect(executeGuard).toBeTruthy()
  })
})
