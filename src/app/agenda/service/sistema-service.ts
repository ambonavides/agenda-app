import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SistemaDTO } from '../model/sistemaDTO';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  constructor(private http: HttpClient) { }

  listar(): Observable<SistemaDTO[]>{
    const url = environment.base_java + environment.api_sistema_listar;
    return this.http.get<SistemaDTO[]>(url);
  }

  salvar(entidade: SistemaDTO): Observable<SistemaDTO> {
    const url = environment.base_java + environment.api_configuracao_salvar;
    return this.http.post<SistemaDTO>(url, entidade);
  }

  alterar(entidade: SistemaDTO): Observable<SistemaDTO> {
    const url = environment.base_java + environment.api_configuracao_alterar;
    return this.http.post<SistemaDTO>(url, entidade);
  }

  remover(entidade: SistemaDTO){
    const url = environment.base_java + environment.api_configuracao_remover + `/${entidade.id}`;
    return this.http.delete(url);
  }

}
