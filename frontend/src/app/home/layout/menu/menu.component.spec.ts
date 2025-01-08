import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MenuComponent } from "./menu.component"
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { Router } from "@angular/router"
import { RouterTestingModule } from '@angular/router/testing'

describe('MenuComponent', () => {

  let component: MenuComponent
  let fixture: ComponentFixture<MenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents()

    fixture = TestBed.createComponent(MenuComponent)
    component = fixture.componentInstance
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate', () => {
    fixture.ngZone?.run(() => {
      const router: Router = TestBed.inject(Router)
      const navigateSpy = jest.spyOn(router, 'navigate')
  
      component.navigate({ detail: ['/home']})
 
      expect(navigateSpy).toHaveBeenCalledWith(['/home'])
    })

    expect(component).toBeTruthy()
  })

})
