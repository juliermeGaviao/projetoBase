import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly breadcrumbSource = new BehaviorSubject<any[]>([
    { label: 'Home', url: '/', home: true },
  ]);
  breadcrumb$ = this.breadcrumbSource.asObservable();

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const root: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
        const breadcrumbs: any[] = this.createBreadcrumbs(root);
        this.updateBreadcrumb(breadcrumbs);
      });
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: any[] = []): any[] {
    if (route) {
      const routeURL: string = route.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      if (route.data['breadCrumb']) {
        breadcrumbs.push({
          label: route.data['breadCrumb'],
          url,
        });
      }

      if (route.firstChild) {
        return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
      }
    }
    return breadcrumbs;
  }

  private updateBreadcrumb(links: any[]) {
    const updatedLinks = [
      { label: 'Home', url: '/home', home: true }
    ];
    this.breadcrumbSource.next([...updatedLinks, ...links]);
  }
}
