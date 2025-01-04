import { TestBed } from "@angular/core/testing"
import { BreadcrumbComponent } from "./breadcrumb.component"
import { ActivatedRoute } from "@angular/router"

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent
  const fakeActivatedRoute = {
    snapshot: { data: {} },
    children: []
  } as ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      declarations: [BreadcrumbComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    const fixture = TestBed.createComponent(BreadcrumbComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BreadcrumbComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should ngAfterViewInit', () => {
    component.ngAfterViewInit()
    expect(component.ngAfterViewInit).toBeTruthy()
  })

})
