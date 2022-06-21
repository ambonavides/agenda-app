import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AdminGuard } from '../admin/admin.guard';
import { DeclaracaoServicosPmjpComponent } from '../bots/declaracao-servicos-pmjp/declaracao-servicos-pmjp.component';
import { HistoricoComponent } from '../bots/declaracao-servicos-pmjp/historico/historico.component';
import { CadastrarClienteComponent } from './login/dashboard/cliente/cadastrar-cliente/cadastrar-cliente.component';
import { PesquisarClienteComponent } from './login/dashboard/cliente/pesquisar-cliente/pesquisar-cliente.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { CadastrarEmpresaComponent } from './login/dashboard/empresa/cadastrar-empresa/cadastrar-empresa.component';
import { PesquisarEmpresaComponent } from './login/dashboard/empresa/pesquisar-empresa/pesquisar-empresa.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: 'pesquisar-empresa', component: PesquisarEmpresaComponent, canActivate: [AdminGuard] },
    { path: 'cadastrar-empresa', component: CadastrarEmpresaComponent, canActivate: [AdminGuard] },
    { path: 'pesquisar-cliente', component: PesquisarClienteComponent, canActivate: [AdminGuard] },
    { path: 'cadastrar-cliente', component: CadastrarClienteComponent, canActivate: [AdminGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    { path: 'principal', component: DeclaracaoServicosPmjpComponent, canActivate: [AdminGuard] },
    { path: 'historico', component: HistoricoComponent, canActivate: [AdminGuard] },
    { path: 'sair',      component: LoginComponent, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})
export class LocalRoutingModule {}