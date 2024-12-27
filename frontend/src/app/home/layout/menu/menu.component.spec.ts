import { TestBed } from "@angular/core/testing"
import { MenuComponent } from "./menu.component"
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"

describe('MenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MenuComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

})
