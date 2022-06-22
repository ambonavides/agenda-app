import { Injectable } from '@angular/core';
import {ClienteDTO} from '../model/clienteDTO';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {HistoricoDTO} from '../model/historicoDTO';
import {StatusDTO} from '../model/statusDTO';

@Injectable({
  providedIn: 'root'
})
export class BotPmjpService {

  pipe: DatePipe;

  constructor(private http: HttpClient) {
    this.pipe = new DatePipe('pt-BR');
  }

  agendarBot(cliente: ClienteDTO, dataAgendamento: Date, competencia: Date): Observable<string> {
    console.log(cliente);
    const dataAgendamentoStr = this.pipe.transform(dataAgendamento, 'yyyy-MM-dd');
    const mesCompStr = this.pipe.transform(competencia, 'MM');
    const anoCompStr = this.pipe.transform(competencia, 'yyyy');
    // api agendar + data agendamento + mes comp + ano comp + codigo cliente
    const url = environment.base_python + environment.api_agendar_bot + dataAgendamentoStr + '/' + mesCompStr + '/' + anoCompStr
      + '/' + cliente.codigo + '/' + cliente.nomeFantasia + '/' + 1; // TODO id da empresa gestora
    return this.http.get<string>(url);
  }

  historicoAgendamentos(competencia: Date): Observable<HistoricoDTO[]> {
    const competenciaFormatada =  String(competencia.getMonth() + 1).padStart(2, '0') + '/' + competencia.getFullYear();
    const url = environment.base_python + environment.api_historico_listar + 1 + '/' + competenciaFormatada; // TODO id da empresa gestora
    return this.http.get<HistoricoDTO[]>(url);
  }

  statusAgendamento(competencia: Date): Observable<StatusDTO[]> {
    const mesCompStr = this.pipe.transform(competencia, 'MM');
    const anoCompStr = this.pipe.transform(competencia, 'yyyy');
    const url = environment.base_python + environment.api_status + mesCompStr + '/' + anoCompStr;
    return this.http.get<StatusDTO[]>(url);
  }



}
