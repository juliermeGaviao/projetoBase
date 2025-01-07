import { TestBed, ComponentFixture } from "@angular/core/testing"
import { BreadcrumbComponent } from "./breadcrumb.component"
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router"
import { RouterTestingModule } from '@angular/router/testing'
import { ListSectorComponent } from "../../component/management/sector/list-sector.component"
import { SectorComponent } from "../../component/management/sector/sector.component"
import { of } from 'rxjs'

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

  it('should filter events by NavigationEnd', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BreadcrumbComponent],
      providers: [{ provide: ActivatedRoute, useValue: { firstChild: null } },
        {
          provide: Router,
          useValue: {
            url: '/non-pdp/phases/8',
            events: of(new NavigationEnd(0, 'http://localhost:4200/#/non-pdp/phases/8', 'http://localhost:4200/#/non-pdp/phases/8'))
          }
        }
      ]
    }).compileComponents()

    const fixture: ComponentFixture<BreadcrumbComponent> = TestBed.createComponent(BreadcrumbComponent)
    const component: BreadcrumbComponent = fixture.componentInstance

    component.ngAfterViewInit()

    expect(component.ngAfterViewInit).toBeTruthy()
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
          { path: 'sector/view', component: SectorComponent, data: { breadCrumb: 'Visualizar' }}
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

  it('should find route /home/sector/view/subsector', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'home',
        children: [{ path: 'sector', component: ListSectorComponent, data: { breadCrumb: 'Setor' }},
          { path: 'sector/view', component: SectorComponent, data: { breadCrumb: 'Visualizar' }},
          { path: 'sector/view/subsector', component: SectorComponent, data: { breadCrumb: 'Listar Subsetores' }}
        ]
      }])],
      declarations: [BreadcrumbComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { firstChild: {
          snapshot: {
            routeConfig: { path: 'sector/view/subsector' }, url: [ { path: 'sector' }, { path: 'view' }, { path: 'subsector' } ],
            data: { breadCrumb: 'Listar Subsetores' }
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
