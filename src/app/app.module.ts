import { HttpClientModule } from '@angular/common/http';
import {LOCALE_ID, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeclaracaoServicosPmjpComponent } from './central/bots/declaracao-servicos-pmjp/declaracao-servicos-pmjp.component';
import { PesquisarClienteComponent } from './central/components/login/dashboard/cliente/pesquisar-cliente/pesquisar-cliente.component';
import { CadastrarEmpresaComponent } from './central/components/login/dashboard/empresa/cadastrar-empresa/cadastrar-empresa.component';
import { CadastrarClienteComponent } from './central/components/login/dashboard/cliente/cadastrar-cliente/cadastrar-cliente.component';
import { PesquisarEmpresaComponent } from './central/components/login/dashboard/empresa/pesquisar-empresa/pesquisar-empresa.component';
import { SuperComponent } from './central/components/super-component';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { HistoricoComponent } from './central/bots/declaracao-servicos-pmjp/historico/historico.component';
import { DashboardComponent } from './central/components/login/dashboard/dashboard.component';
import { LoginComponent } from './central/components/login/login.component';
import { LocalRoutingModule } from './central/components/local-routing.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { authInterceptorProviders } from './central/helpers/auth.interceptor';
import { AdminGuard } from './central/admin/admin.guard';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { CPFPipe } from './compartilhado/cpf.pipe';
import { CNPJPipe } from './compartilhado/cnpj.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    SuperComponent,
    DeclaracaoServicosPmjpComponent,
    DashboardComponent,
    PesquisarClienteComponent,
    CadastrarClienteComponent,
    PesquisarEmpresaComponent,
    CadastrarEmpresaComponent,
    LoginComponent,
    HistoricoComponent,
    CPFPipe,
    CNPJPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    PaginatorModule,
    DropdownModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule ,
    LocalRoutingModule,
    MenubarModule,
    TabMenuModule,
    CheckboxModule,
    TableModule,
    PasswordModule,
    CalendarModule,
    InputNumberModule,
    MessagesModule,
    MessageModule

  ],
  providers: [authInterceptorProviders, AdminGuard, {provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
