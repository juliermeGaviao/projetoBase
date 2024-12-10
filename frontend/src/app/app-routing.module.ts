import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardBensComponent } from './home/dashboard-bens/dashboard-bens.component';
import { HomeComponent } from './home/home.component';
import { InfosGeraisComponent } from './home/layout/menu/infos-gerais/infos-gerais.component';
import { LoginComponent } from './security/components/login/login.component';
import { homeAuthGuard } from './security/guards/homeAuth.guard';
import { PageErrorComponent } from './shared/component/page-error/page-error.component';
import { TermoApreensaoComponent } from './home/layout/menu/termo-apreensao/termo-apreensao.component';
import { TermoDepositoComponent } from './home/layout/menu/termo-deposito/termo-deposito.component';
import { AutoInfracaoComponent } from './home/layout/menu/auto-infracao/auto-infracao.component';
import { TermoSolturaComponent } from './home/layout/menu/termo-soltura/termo-soltura.component';
import { TermoDestruicaoComponent } from './home/layout/menu/termo-destruicao/termo-destruicao.component';
import { TermoEntregaComponent } from './home/layout/menu/termo-entrega/termo-entrega.component';
import { ComunicacaoBensComponent } from './home/layout/menu/comunicacao-bens/comunicacao-bens.component';
import { TicketComponent } from './shared/component/ticket/ticket.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'ticket', component: TicketComponent },
  { path: 'error-page', component: PageErrorComponent },
  {
    path: 'dashboard',
    component: DashboardBensComponent,
    canActivate: [homeAuthGuard],
    data: { breadCrumb: 'Dashboard Bens Apreendidos' }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [homeAuthGuard],
    children: [
      { path: 'infos-gerais', component: InfosGeraisComponent, data: { breadCrumb: 'Informações Gerais' } },
      { path: 'auto-infracao', component: AutoInfracaoComponent, data: { breadCrumb: 'Auto de Infração' } },
      { path: 'termo-apreensao', component: TermoApreensaoComponent, data: { breadCrumb: 'Termo de Apreensão' } },
      { path: 'termo-deposito', component: TermoDepositoComponent, data: { breadCrumb: 'Termo de Depósito' } },
      { path: 'termo-soltura', component: TermoSolturaComponent, data: { breadCrumb: 'Termo de Soltura' } },
      { path: 'termo-entrega', component: TermoEntregaComponent, data: { breadCrumb: 'Termo de Entrega' } },
      { path: 'termo-destruicao', component: TermoDestruicaoComponent, data: { breadCrumb: 'Termo de Destruição/Inutilização' } },
      { path: 'comunicacao-bens', component: ComunicacaoBensComponent, data: { breadCrumb: 'Comunicação de Bens' } }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
