import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) { }

  isLoggedIn(){
    return !!this.tokenStorageService.getToken();
  }

  getUser(){
    return this.tokenStorageService.getUser();
  }

  signOut(){
    return this.tokenStorageService.signOut();
  }

  login(login: string, senha: string): Observable<any> {
    return this.http.post(environment.base_java + environment.auth_api + 'signin', {
      login,
      senha
    }, httpOptions);
  }

  register(login: string, email: string, senha: string): Observable<any> {
    return this.http.post(environment.base_java + environment.auth_api + 'signup', {
      login,
      email,
      senha
    }, httpOptions);
  }
}
