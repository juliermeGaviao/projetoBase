import { TestBed, ComponentFixture } from "@angular/core/testing"
import { BreadcrumbComponent } from "./breadcrumb.component"
import { ActivatedRoute, Router } from "@angular/router"
import { RouterTestingModule } from '@angular/router/testing'
import { ListSectorComponent } from "../../component/management/sector/list-sector.component"
import { SectorComponent } from "../../component/management/sector/sector.component"

describe('BreadcrumbComponent', () => {

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BreadcrumbComponent],
      providers: [{ provide: ActivatedRoute, useValue: { firstChild: null } }]
    }).compileComponents()

    const fixture: ComponentFixture<BreadcrumbComponent> = TestBed.createComponent(BreadcrumbComponent)
    const component: BreadcrumbComponent = fixture.componentInstance

    expect(component).toBeDefined()
  })

  it('should have no child', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BreadcrumbComponent],
      providers: [{ provide: ActivatedRoute, useValue: { firstChild: null } }]
    }).compileComponents()

    const fixture: ComponentFixture<BreadcrumbComponent> = TestBed.createComponent(BreadcrumbComponent)
    const component: BreadcrumbComponent = fixture.componentInstance

    component.ngAfterViewInit()

    expect(component.ngAfterViewInit).toBeTruthy()
  })

  it('should go home', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [BreadcrumbComponent],
      providers: [{ provide: ActivatedRoute, useValue: { firstChild: null } }
      ]
    }).compileComponents()

    const fixture: ComponentFixture<BreadcrumbComponent> = TestBed.createComponent(BreadcrumbComponent)
    const component: BreadcrumbComponent = fixture.componentInstance

    fixture.ngZone?.run(() => {
      const router: Router = TestBed.inject(Router)
      const navigateSpy = jest.spyOn(router, 'navigate')
  
      component.goHome()
  
      expect(navigateSpy).toHaveBeenCalledWith(['/home'])
    })
  })

  it('should navigate', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [BreadcrumbComponent],
      providers: [{ provide: ActivatedRoute, useValue: { firstChild: null } }]
    }).compileComponents()

    const fixture: ComponentFixture<BreadcrumbComponent> = TestBed.createComponent(BreadcrumbComponent)
    const component: BreadcrumbComponent = fixture.componentInstance

    fixture.ngZone?.run(() => {
      const router: Router = TestBed.inject(Router)
      const navigateSpy = jest.spyOn(router, 'navigate')
  
      component.navigate('/home/sector')
  
      expect(navigateSpy).toHaveBeenCalledWith(['/home/sector'])
    })
  })

  it('should have no configured routes', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BreadcrumbComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { firstChild: { snapshot: { routeConfig: { path: '' } } } } }
      ]
    }).compileComponents()

    const fixture: ComponentFixture<BreadcrumbComponent> = TestBed.createComponent(BreadcrumbComponent)
    const component: BreadcrumbComponent = fixture.componentInstance

    component.ngAfterViewInit()

    expect(component.ngAfterViewInit).toBeTruthy()
  })

  it('should find route /home/sector/view', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'home',
        children: [{ path: 'sector', component: ListSectorComponent, data: { breadCrumb: 'Setor' }},
          { path: 'view', component: SectorComponent, data: { breadCrumb: 'Visualizar' }}
        ]
      }])],
      declarations: [BreadcrumbComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { firstChild: {
          snapshot: {
            routeConfig: { path: 'sector/view' }, url: [ { path: 'sector' }, { path: 'view' } ],
            data: { breadCrumb: 'Visualizar' }
          }
        } } }
      ]
    }).compileComponents()

    const fixture: ComponentFixture<BreadcrumbComponent> = TestBed.createComponent(BreadcrumbComponent)
    const component: BreadcrumbComponent = fixture.componentInstance

    component.ngAfterViewInit()

    expect(component.ngAfterViewInit).toBeTruthy()
  })

})
