import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioDTO } from '../model/usuarioDTO';
import { map, catchError } from 'rxjs/operators';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  autenticar(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    const url = environment.base_java + environment.api_usuario_autenticar;
    return this.http.post<UsuarioDTO>(url, usuario);
  }

}
