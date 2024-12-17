import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter, startWith } from 'rxjs'

interface Breadcrumb {
  label: string
  url: string
  visible: boolean
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
      const initialLinks = [
        {
          label: 'Página Inicial',
          url: '/',
          home: true,
        }
      ]

      this.links = this.buildBreadcrumbs(this.activatedRoute.root, '', initialLinks)

      // Forçar detecção de mudanças
      this.cdr.detectChanges()
    })
  }

  buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children

    if (children.length === 0) {
      return breadcrumbs
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/')

      if (routeURL !== '') {
        url += `/${routeURL}`
        const breadcrumb: Breadcrumb = {
          label: child.snapshot.data['breadCrumb'] || routeURL,
          url,
          visible: true,
        }

        if (breadcrumb.label?.endsWith('home')) {
          breadcrumb.label = 'Página Inicial'
        }

        breadcrumbs.push(breadcrumb)
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs)
    }

    return breadcrumbs
  }
}
