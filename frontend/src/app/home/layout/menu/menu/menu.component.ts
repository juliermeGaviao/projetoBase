import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SharedService } from '../../../../services/shared.service';


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
      name: 'Informações Gerais',
      url: '/home/infos-gerais',
      isSpaLinkBehavior: true,
    },
    {
      id: 2,
      name: 'Auto de Infração',
      url: '/home/auto-infracao',
      disabled: true, 
    },
    {
      id: 3,
      name: 'Termo de Apreensão',
      url: '/home/termo-apreensao',
      isSpaLinkBehavior: true,
    },
    {
      id: 4,
      name: 'Termo Depósito',
      url: '/home/termo-deposito',
      isSpaLinkBehavior: true,
    },
    {
      id: 5,
      name: 'Termo Soltura',
      url: '/home/termo-soltura',
      isSpaLinkBehavior: true,
    },

    {
      id: 6,
      name: 'Termo de Entrega',
      url: '/home/termo-entrega',
      isSpaLinkBehavior: true,
    },
    {
      id: 7,
      name: 'Termo de Destruição/Inutilização',
      url: '/home/termo-destruicao',
      isSpaLinkBehavior: true,
    },
    {
      id: 8,
      name: 'Comunicação de Bens Apreendidos',
      url: '/home/comunicacao-bens',
      isSpaLinkBehavior: true,
    },
   
  ];

  navigate(route: any) {
    const { detail: pathRouter } = route
    this.router.navigate(pathRouter)
  }
}
