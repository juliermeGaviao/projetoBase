import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  showBreadcrumb = false
  links: any[] = []

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}


  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.route.root.firstChild?.snapshot

        this.links = [
          {
            label: 'Página Inicial',
            url: '/',
            home: true,
          },
        ]
        this.showBreadcrumb = false
        if (currentRoute && currentRoute.routeConfig.path !== 'home') {
          this.links.push({
            label: currentRoute.data.breadCrumb,
            url: currentRoute.routeConfig.path,
            active: true,
          })

          this.showBreadcrumb = true
        }
      }
    })
  }
}
