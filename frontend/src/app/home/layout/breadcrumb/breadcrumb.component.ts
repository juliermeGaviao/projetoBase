import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, Route, ActivatedRouteSnapshot } from '@angular/router'
import { filter, startWith } from 'rxjs'

interface Breadcrumb {
  label: string
  url: string
  actual: boolean
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements AfterViewInit {
  links: Breadcrumb[] = []

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef  // Injetar ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(new NavigationEnd(0, this.router.url, this.router.url)) // Emite um evento inicial de NavigationEnd
    ).subscribe(() => {
      this.links = []

      if (this.activatedRoute.firstChild) {
        let path: string = ''
        let snapshot: ActivatedRouteSnapshot = this.activatedRoute.firstChild.snapshot
        let home: Route = this.getHomeRoute()

        for (let i = 0; i < snapshot.url.length - 1; i++) {
          path = (path.length > 0 ? '/' : '') + snapshot.url[i].path

          for (let route of home.children) {
            if (path === route.path) {
              this.links.push({
                label: route.data['breadCrumb'],
                url: 'home/' + path,
                actual: false
              })
            }
          }
        }

        this.links.push({
          label: snapshot.data['breadCrumb'],
          url: 'home/' + snapshot.routeConfig.path,
          actual: true
        })
      }

      // Forçar detecção de mudanças
      this.cdr.detectChanges()
    })
  }

  goHome() {
    this.router.navigate(['/home'])
  }

  getHomeRoute(): Route {
    let result: Route = null

    for (let route of this.router.config) {
      if (route.path === 'home') {
        result = route
      }
    }

    return result
  }

  navigate(url: string) {
    this.router.navigate([url])
  }

}
