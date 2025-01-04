import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './security/login/login.component'
import { HomeAuthGuard } from './security/guards/homeAuth.guard'
import { PageErrorComponent } from './shared/component/page-error/page-error.component'
import { WelcomeComponent } from './home/layout/welcome/welcome.component'

import { ListSectorComponent } from './home/component/management/sector/list-sector.component'
import { SectorComponent } from './home/component/management/sector/sector.component'
import { ListProductComponent } from './home/component/management/product/list-product.component'
import { ProductComponent } from './home/component/management/product/product.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'error-page', component: PageErrorComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeAuthGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
        data: { breadCrumb: 'Página Inicial' }
      },
      { path: 'sector',
        component: ListSectorComponent,
        data: { breadCrumb: 'Setor' },
      },
      { path: 'sector/view',
        component: SectorComponent,
        data: { breadCrumb: 'Visualizar' }
      },
      { path: 'sector/new',
        component: SectorComponent,
        data: { breadCrumb: 'Novo' }
      },
      { path: 'sector/edit',
        component: SectorComponent,
        data: { breadCrumb: 'Editar' }
      },
      { path: 'product',
        component: ListProductComponent,
        data: { breadCrumb: 'Produto' }
      },
      { path: 'product/view',
        component: ProductComponent,
        data: { breadCrumb: 'Visualizar' }
      },
      { path: 'product/new',
        component: ProductComponent,
        data: { breadCrumb: 'Novo' }
      },
      { path: 'product/edit',
        component: ProductComponent,
        data: { breadCrumb: 'Editar' }
      },
    ]
  },
  { path: '**', redirectTo: 'login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
