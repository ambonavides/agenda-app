import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './central/components/login/dashboard/dashboard.component';
import { LoginComponent } from './central/components/login/login.component';
import { DeclaracaoServicosPmjpComponent } from './central/bots/declaracao-servicos-pmjp/declaracao-servicos-pmjp.component';
import { HistoricoComponent } from './central/bots/declaracao-servicos-pmjp/historico/historico.component';
import { AdminGuard } from './central/admin/admin.guard';

const routes: Routes = [
  { path: '',          component: LoginComponent },
  { path: 'login',     component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
