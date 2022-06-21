import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EmpresaGestoraDTO } from '../model/empresa-gestoraDTO';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }
  listar(objeto: EmpresaGestoraDTO, page: number, size: number): Observable<Page>  {
    const url = environment.base_java + environment.api_empresa_listar + `/${page}/${size}`;
    return this.http.post<Page>(url, objeto );
  }

  listarTodasEmpresas(): Observable<EmpresaGestoraDTO[]>{
    const url = environment.base_java + environment.api_empresa_listar_todos;
    return this.http.get<EmpresaGestoraDTO[]>(url);
  }

  salvar(objeto: EmpresaGestoraDTO): Observable<EmpresaGestoraDTO> {
    const url = environment.base_java + environment.api_empresa_salvar;
    return this.http.post<EmpresaGestoraDTO>(url, objeto);
  }

  alterar(objeto: EmpresaGestoraDTO): Observable<EmpresaGestoraDTO> {
    const url = environment.base_java + environment.api_empresa_alterar;
    return this.http.post<EmpresaGestoraDTO>(url, objeto);
  }

  remover(objeto: EmpresaGestoraDTO){
    const url = environment.base_java + environment.api_empresa_remover + `/${objeto.id}`;
    return this.http.delete(url);
  }

  buscarPorId(id: number): Observable<EmpresaGestoraDTO>{
    const url = environment.base_java + environment.api_empresa_buscar_por_id + `/${id}`;
    return this.http.get<EmpresaGestoraDTO>(url);
  }

}
