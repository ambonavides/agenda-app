import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthService } from './agenda/service/auth.service';
import { TokenStorageService } from './agenda/service/token-storage.service';
import { UserService } from './agenda/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    protected router: Router,
    private authService: AuthService
  ) { }

  items: MenuItem[];

  ngOnInit() {
    this.autenticar();
    this.carregarMenu();
  }

  private autenticar() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.authService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.login;
    }
  }

  private carregarMenu() {
    this.items = [
      {
        label: 'Manter',
        icon: 'pi pi-fw pi-sliders-h',
        items: [
          { label: 'Clientes', icon: 'fab fa-black-tie', routerLink: 'pesquisar-cliente' },
        ]
      },
      {
        label: 'Sair',
        icon: 'fa fa-sign-out',
        routerLink: 'sair',
        command: e => this.logout()
      }
    ];
  }

  logout(): void {
    this.authService.signOut();
    window.location.reload();
  }

  getUsuarioLogado() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }


}
