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
import { PesquisarClienteComponent } from './agenda/components/login/dashboard/cliente/pesquisar-cliente/pesquisar-cliente.component';
import { CadastrarClienteComponent } from './agenda/components/login/dashboard/cliente/cadastrar-cliente/cadastrar-cliente.component';
import { SuperComponent } from './agenda/components/super-component';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { DashboardComponent } from './agenda/components/login/dashboard/dashboard.component';
import { LoginComponent } from './agenda/components/login/login.component';
import { LocalRoutingModule } from './agenda/components/local-routing.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { authInterceptorProviders } from './agenda/helpers/auth.interceptor';
import { AdminGuard } from './agenda/admin/admin.guard';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { CPFPipe } from './compartilhado/cpf.pipe';
import { CNPJPipe } from './compartilhado/cnpj.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    SuperComponent,
    DashboardComponent,
    PesquisarClienteComponent,
    CadastrarClienteComponent,
    LoginComponent,
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
