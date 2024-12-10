import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/components/login/login.component';
import { homeAuthGuard } from './security/guards/homeAuth.guard';
import { PageErrorComponent } from './shared/component/page-error/page-error.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'error-page', component: PageErrorComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [homeAuthGuard],
    children: [
      { path: 'sector', component: LoginComponent, data: { breadCrumb: 'Setor' } }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
