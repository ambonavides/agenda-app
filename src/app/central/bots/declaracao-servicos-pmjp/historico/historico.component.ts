import { Component, OnInit } from '@angular/core';
import {Page} from '../../../model/page';
import {ClienteService} from '../../../service/cliente-services';
import {HistoricoDTO} from '../../../model/historicoDTO';
import {BotPmjpService} from '../../../service/bot-pmjp.service';
import {ClienteDTO} from '../../../model/clienteDTO';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  historico: HistoricoDTO[];
  historicoFiltro: HistoricoDTO;
  page: Page;
  size: number;
  totalElementos: number;
  competencia: Date;
  anoReferencia: string;
  loading: boolean;
  cliente: ClienteDTO;

  constructor(private botPmjpService: BotPmjpService, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.competencia = new Date();
    this.competencia.setMonth(this.competencia.getMonth() - 1);
    this.anoReferencia = (new Date().getFullYear() - 1) + ':' + (new Date().getFullYear() + 1);
    this.loading = true;
    this.listar();
    this.cliente = null;
  }

  listar() {
    this.botPmjpService.historicoAgendamentos(this.competencia)
      .subscribe((data) => {
        this.historico = data;
        this.loading = false;
      },
        (err) => {
          console.log(err);
        });
  }

}
