import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AdminGuard } from '../admin/admin.guard';
import { CadastrarClienteComponent } from './login/dashboard/cliente/cadastrar-cliente/cadastrar-cliente.component';
import { PesquisarClienteComponent } from './login/dashboard/cliente/pesquisar-cliente/pesquisar-cliente.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: 'pesquisar-cliente', component: PesquisarClienteComponent, canActivate: [AdminGuard] },
    { path: 'cadastrar-cliente', component: CadastrarClienteComponent, canActivate: [AdminGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    { path: 'sair',      component: LoginComponent, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})
export class LocalRoutingModule {}