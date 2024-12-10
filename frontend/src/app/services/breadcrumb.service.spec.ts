import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbService } from './breadcrumb.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [BreadcrumbService],
    });

    service = TestBed.inject(BreadcrumbService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with Home breadcrumb', (done) => {
    service.breadcrumb$.subscribe((breadcrumbs) => {
      expect(breadcrumbs).toEqual([
        { label: 'Home', url: '/', home: true },
      ]);
      done();
    });
  });

  it('should update breadcrumbs on navigation end', (done) => {
    const event = new NavigationEnd(1, '/dashboard', '/dashboard');
    (router.events as BehaviorSubject<any>).next(event);

    service.breadcrumb$.subscribe((breadcrumbs) => {
      expect(breadcrumbs).toEqual([
        { label: 'Home', url: '/', home: true },
        { label: 'Dashboard Bens Apreendidos', url: '/dashboard' },
      ]);
      done();
    });
  });


  it('should add Home and Dashboard breadcrumbs when updating', (done) => {
    service['updateBreadcrumb']([
      { label: 'New Breadcrumb', url: '/new' },
    ]);

    service.breadcrumb$.subscribe((breadcrumbs) => {
      expect(breadcrumbs).toEqual([
        { label: 'Home', url: '/', home: true },
        { label: 'Dashboard Bens Apreendidos', url: '/dashboard' },
        { label: 'New Breadcrumb', url: '/new' },
      ]);
      done();
    });
  });
});
