import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './agenda/components/login/dashboard/dashboard.component';
import { LoginComponent } from './agenda/components/login/login.component';
import { AdminGuard } from './agenda/admin/admin.guard';

const routes: Routes = [
  { path: '',          component: LoginComponent },
  { path: 'login',     component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
