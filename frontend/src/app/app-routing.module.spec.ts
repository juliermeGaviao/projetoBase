import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { AppRoutingModule } from './app-routing.module'
import { Location } from '@angular/common'

describe('AppRoutingModule', () => {
  let router: Router
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), AppRoutingModule],
    }).compileComponents()

    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    router.initialNavigation()
  })

  it('should navigate to login by default', async () => {
    await router.navigate([''])
    expect(location.path()).toBe('/login')
  })

  it('should navigate to ticket', async () => {
    await router.navigate(['/ticket'])
    expect(location.path()).toBe('/ticket')
  })

  it('should redirect unknown routes to login', async () => {
    await router.navigate(['/unknown-route'])
    expect(location.path()).toBe('/login')
  })


})
