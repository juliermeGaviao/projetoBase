import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject();
    mockRouter = {
      events: routerEvents$.asObservable(),
    };
    mockActivatedRoute = {
      root: {
        firstChild: {
          snapshot: {
            routeConfig: {
              path: 'about',
            },
            data: {
              breadCrumb: 'About Us',
            },
          },
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize breadcrumb with default home link', () => {
    mockActivatedRoute.root.firstChild = null;
    routerEvents$.next(new NavigationEnd(1, '/', '/'));
    expect(component.links).toEqual([
      {
        label: 'Página Inicial',
        url: '/',
        home: true,
      },
    ]);
    expect(component.showBreadcrumb).toBe(false);
  });

  it('should add breadcrumb for a non-home route', () => {
    mockActivatedRoute.root.firstChild.snapshot.routeConfig.path = 'about';
    mockActivatedRoute.root.firstChild.snapshot.data.breadCrumb = 'About Us';
    routerEvents$.next(new NavigationEnd(1, '/about', '/about'));
    expect(component.links).toEqual([
      {
        label: 'Página Inicial',
        url: '/',
        home: true,
      },
      {
        label: 'About Us',
        url: 'about',
        active: true,
      },
    ]);
    expect(component.showBreadcrumb).toBe(true);
  });

  it('should not add breadcrumb if routeConfig or data is missing', () => {
    mockActivatedRoute.root.firstChild.snapshot = null;
    routerEvents$.next(new NavigationEnd(1, '/invalid-route', '/invalid-route'));
    expect(component.links).toEqual([
      {
        label: 'Página Inicial',
        url: '/',
        home: true,
      },
    ]);
    expect(component.showBreadcrumb).toBe(false);
  });

  it('should handle case where root has no firstChild', () => {
    mockActivatedRoute.root.firstChild = null;
    routerEvents$.next(new NavigationEnd(1, '/no-child', '/no-child'));
    expect(component.links).toEqual([
      {
        label: 'Página Inicial',
        url: '/',
        home: true,
      },
    ]);
    expect(component.showBreadcrumb).toBe(false);
  });

  it('should update breadcrumbs on multiple navigation events', () => {
    mockActivatedRoute.root.firstChild.snapshot.routeConfig.path = 'about';
    mockActivatedRoute.root.firstChild.snapshot.data.breadCrumb = 'About Us';
    routerEvents$.next(new NavigationEnd(1, '/about', '/about'));
    expect(component.links).toEqual([
      {
        label: 'Página Inicial',
        url: '/',
        home: true,
      },
      {
        label: 'About Us',
        url: 'about',
        active: true,
      },
    ]);
    expect(component.showBreadcrumb).toBe(true);
    mockActivatedRoute.root.firstChild.snapshot.routeConfig.path = 'contact';
    mockActivatedRoute.root.firstChild.snapshot.data.breadCrumb = 'Contact Us';
    routerEvents$.next(new NavigationEnd(2, '/contact', '/contact'));
    expect(component.links).toEqual([
      {
        label: 'Página Inicial',
        url: '/',
        home: true,
      },
      {
        label: 'Contact Us',
        url: 'contact',
        active: true,
      },
    ]);
    expect(component.showBreadcrumb).toBe(true);
  });
});
