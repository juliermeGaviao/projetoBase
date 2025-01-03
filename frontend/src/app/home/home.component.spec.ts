import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'
import { SharedService } from 'src/app/services/shared.service'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let sharedService: SharedService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [SharedService],
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    sharedService = TestBed.inject(SharedService)
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize with menu open', () => {
    expect(component.sharedService.isOpen).toBeFalsy()
  })

  it('should toggle menu state', () => {
    expect(component.sharedService.isOpen).toBeFalsy()
  })

  it('should reflect shared service state for menu', () => {
    sharedService.isOpen = true
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('.template-base')?.classList).toContain('menu-open')

    sharedService.isOpen = false
    fixture.detectChanges()
    expect(compiled.querySelector('.template-base')?.classList).toContain('menu-closed')
  })
})
