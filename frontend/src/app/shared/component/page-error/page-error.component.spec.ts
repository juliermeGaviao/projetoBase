import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageErrorComponent } from './page-error.component'

describe('PageErrorComponent', () => {
  let component: PageErrorComponent
  let fixture: ComponentFixture<PageErrorComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageErrorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PageErrorComponent)
    component = fixture.componentInstance
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should catch error', () => {
    expect(() => component.ngOnInit()).toThrow()
  })
  
})
