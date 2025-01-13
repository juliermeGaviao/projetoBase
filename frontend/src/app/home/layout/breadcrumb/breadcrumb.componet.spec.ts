import { TestBed, ComponentFixture } from "@angular/core/testing"
import { BreadcrumbComponent } from "./breadcrumb.component"
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router"
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { ListSectorComponent } from "../../component/management/sector/list-sector.component"
import { SectorComponent } from "../../component/management/sector/sector.component"

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent
  let fixture: ComponentFixture<BreadcrumbComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{
        path: 'home',
        children: [
          { path: 'sector', component: ListSectorComponent, data: { breadCrumb: 'Setor' } },
          { path: 'sector/view', component: SectorComponent, data: { breadCrumb: 'Visualizar' } },
          { path: 'sector/view/subsector', component: SectorComponent, data: { breadCrumb: 'Listar Subsetores' } }
        ]
      }])],
      declarations: [BreadcrumbComponent],
      providers: [{ provide: ActivatedRoute, useValue: { firstChild: null } }]
    }).compileComponents()
  })

  describe('when theres no router', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(BreadcrumbComponent)

      component = fixture.componentInstance
    
      fixture.detectChanges()
    })

    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should initiate the component', () => {
      component.ngAfterViewInit()

      expect(component.ngAfterViewInit).toBeTruthy()
    })

    it('should go home', () => {
      const router: Router = TestBed.inject(Router)
      const navigateSpy = jest.spyOn(router, 'navigate')

      fixture.ngZone?.run(() => {
        component.goHome()
      })

      expect(navigateSpy).toHaveBeenCalledWith(['/home'])
    })
  
    it('should navigate', () => {
      const router: Router = TestBed.inject(Router)
      const navigateSpy = jest.spyOn(router, 'navigate')

      fixture.ngZone?.run(() => {
        component.navigate('/home/sector')
      })

      expect(navigateSpy).toHaveBeenCalledWith(['/home/sector'])
    })

  })

  describe('when theres router defined', () => {

    beforeEach(async () => {
      TestBed.overrideProvider(Router, {
        useValue: {
          url: '/non-pdp/phases/8',
          events: of(new NavigationEnd(0, 'http://localhost:4200/#/non-pdp/phases/8', 'http://localhost:4200/#/non-pdp/phases/8'))
        }
      })

      fixture = TestBed.createComponent(BreadcrumbComponent)

      component = fixture.componentInstance
    
      fixture.detectChanges()
    })

    it('should create the component', () => {
      component.ngAfterViewInit()

      expect(component.ngAfterViewInit).toBeTruthy()
    })

  })

  describe('when ative route is empty', () => {

    beforeEach(async () => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: { firstChild: { snapshot: { routeConfig: { path: '' } } } }
      })

      fixture = TestBed.createComponent(BreadcrumbComponent)

      component = fixture.componentInstance
    
      fixture.detectChanges()
    })

    it('should create the component', () => {
      component.ngAfterViewInit()

      expect(component.ngAfterViewInit).toBeTruthy()
    })
  
  })

  describe('should find route /home/sector/view', () => {

    beforeEach(async () => {
      TestBed.overrideProvider(ActivatedRoute, {
        useValue: {
          firstChild: {
            snapshot: {
              routeConfig: { path: 'sector/view' }, url: [ { path: 'sector' }, { path: 'view' } ],
              data: { breadCrumb: 'Visualizar' }
            }
          }
        }
      })

      fixture = TestBed.createComponent(BreadcrumbComponent)

      component = fixture.componentInstance
    
      fixture.detectChanges()
    })

    it('should create the component', () => {
      component.ngAfterViewInit()

      expect(component.ngAfterViewInit).toBeTruthy()
    })
  
  })

  describe('should find route /home/sector/view/subsector', () => {

    beforeEach(async () => {
      TestBed.overrideProvider(ActivatedRoute, {
        useValue: {
          firstChild: {
            snapshot: {
              routeConfig: { path: 'sector/view/subsector' }, url: [ { path: 'sector' }, { path: 'view' }, { path: 'subsector' } ],
              data: { breadCrumb: 'Listar Subsetores' }
            }
          }
        }
      })

      fixture = TestBed.createComponent(BreadcrumbComponent)

      component = fixture.componentInstance
    
      fixture.detectChanges()
    })

    it('should create the component', () => {
      component.ngAfterViewInit()

      expect(component.ngAfterViewInit).toBeTruthy()
    })
  
  })

})
