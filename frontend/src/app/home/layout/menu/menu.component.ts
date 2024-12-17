import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SharedService } from '../../../services/shared.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
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
      icon: 'home',
      name: 'Página Inicial',
      url: '/home',
      isSpaLinkBehavior: true,
    },
    {
      id: 2,
      icon: 'list',
      name: 'Setor',
      url: '/home/sector',
      isSpaLinkBehavior: true,
    },
    {
      id: 3,
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
