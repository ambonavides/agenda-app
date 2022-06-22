import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '../model/page';
import {DatePipe} from '@angular/common';
import { ClienteDTO } from '../model/clienteDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  pipe: DatePipe;

  constructor(private http: HttpClient) {
    this.pipe = new DatePipe('pt-BR');
  }

  listar(objeto: ClienteDTO, page: number, size: number): Observable<Page>  {
    const url = environment.base_java + environment.api_cliente_listar + `/${page}/${size}`;
    return this.http.post<Page>(url, objeto);
  }

  listar_todos(): Observable<ClienteDTO[]>  {
    const url = environment.base_java + environment.api_cliente_listar_todos;
    return this.http.get<ClienteDTO[]>(url);
  }

  salvar(objeto: ClienteDTO): Observable<ClienteDTO> {
    const url = environment.base_java + environment.api_cliente_salvar;
    return this.http.post<ClienteDTO>(url, objeto);
  }

  alterar(objeto: ClienteDTO): Observable<ClienteDTO> {
    const url = environment.base_java + environment.api_cliente_alterar;
    return this.http.post<ClienteDTO>(url, objeto);
  }

  remover(objeto: ClienteDTO){
    const url = environment.base_java + environment.api_cliente_remover + `/${objeto.id}`;
    return this.http.delete(url);
  }

  buscarPorId(id: number): Observable<ClienteDTO>{
    const url = environment.base_java + environment.api_cliente_buscar_por_id + `/${id}`;
    return this.http.get<ClienteDTO>(url);
  }

  downloadPorCompECliente(cliente: ClienteDTO, mesCompStr: string, anoCompStr: string): Observable<Blob>{
    const url = environment.base_python + environment.api_download_comp_cliente + `${cliente.codigo}` + `/${mesCompStr}` + `/${anoCompStr}`;
    return this.http.get(url, {responseType: 'blob'});
  }

  downloadPorCompEEmpresa(empresaGestoraID: string, mesCompStr: string, anoCompStr: string): Observable<Blob>{
    const url = environment.base_python + environment.api_download_comp_empresa + `${empresaGestoraID}` + `/${mesCompStr}` + `/${anoCompStr}`;
    return this.http.get(url, {responseType: 'blob'});
  }

}
