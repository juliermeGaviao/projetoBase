import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SharedService } from '../../../services/shared.service'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  public id: string = 'main-navigation'

  constructor(
    private readonly router: Router,
    public sharedService: SharedService
  ) {}

  public menuItems: any[] = [
    {
      id: 1,
      icon: 'list',
      name: 'Setor',
      url: '/home/sector',
      isSpaLinkBehavior: true,
    },
    {
      id: 2,
      icon: 'file',
      name: 'Produto',
      url: '/home/product',
      isSpaLinkBehavior: true,
    }
  ]

  navigate(route: any) {
    const { detail: pathRouter } = route
    this.router.navigate(pathRouter)
  }

}
