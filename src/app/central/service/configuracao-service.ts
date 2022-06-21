import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfiguracaoClienteDTO } from '../model/configuracao-clienteDTO';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  constructor(private http: HttpClient) { }

  listar(): Observable<ConfiguracaoClienteDTO[]>{
    const url = environment.base_java + environment.api_configuracao_listar;
    return this.http.get<ConfiguracaoClienteDTO[]>(url);
  }

  salvar(entidade: ConfiguracaoClienteDTO): Observable<ConfiguracaoClienteDTO> {
    const url = environment.base_java + environment.api_configuracao_salvar;
    return this.http.post<ConfiguracaoClienteDTO>(url, entidade);
  }

  alterar(entidade: ConfiguracaoClienteDTO): Observable<ConfiguracaoClienteDTO> {
    const url = environment.base_java + environment.api_configuracao_alterar;
    return this.http.post<ConfiguracaoClienteDTO>(url, entidade);
  }

  remover(entidade: ConfiguracaoClienteDTO){
    const url = environment.base_java + environment.api_configuracao_remover + `/${entidade.id}`;
    return this.http.delete(url);
  }

}
