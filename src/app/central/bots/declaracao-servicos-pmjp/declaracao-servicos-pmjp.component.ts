import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioDTO} from '../../model/usuarioDTO';
import { Page } from '../../model/page';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ClienteService} from '../../service/cliente-services';
import { SuperComponent } from '../../components/super-component';
import {ClienteDTO} from '../../model/clienteDTO';
import { LazyLoadEvent } from 'primeng/api';
import {BotPmjpService} from '../../service/bot-pmjp.service';
import {DatePipe} from '@angular/common';
import {EmpresaGestoraDTO} from '../../model/empresa-gestoraDTO';
import {AuthService} from '../../service/auth.service';
import {StatusDTO} from '../../model/statusDTO';

@Component({
  selector: 'app-declaracao-servicos-pmjp',
  templateUrl: './declaracao-servicos-pmjp.component.html',
  styleUrls: ['./declaracao-servicos-pmjp.component.scss']
})
export class DeclaracaoServicosPmjpComponent extends SuperComponent {
  clientes: ClienteDTO[] = [];
  clientesFiltrados: ClienteDTO[] = [];
  cliente: ClienteDTO;
  declaracaoPMJPCadastro: ClienteDTO;
  clienteFiltro: ClienteDTO;
  closeResult: string;
  page: Page;
  size: number;
  totalElementos: number;
  dataAgendamento: Date;
  clientesSelecionados: ClienteDTO[] = [];
  loading: boolean;
  competencia: Date;
  anoReferencia: string;
  botaoAgendarTodos: boolean;
  pipe: DatePipe = new DatePipe('pt-BR');
  empresaGestoraID: string;
  userAuth: UsuarioDTO;
  status: StatusDTO[] = [];

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private clienteService: ClienteService,
    private botPmjpService: BotPmjpService,
    private authService: AuthService
  ) {
    super(modalService, router);

  }

  ngOnInit(): void {
    this.userAuth = this.authService.getUser();
    this.cliente = new ClienteDTO();
    this.declaracaoPMJPCadastro = new ClienteDTO();
    this.clienteFiltro = new ClienteDTO();
    this.dataAgendamento = null;
    this.buscar();
    this.clientesSelecionados = [];
    this.loading = true;
    this.clientesFiltrados = [];
    this.competencia = new Date();
    this.competencia.setMonth(this.competencia.getMonth() - 1);
    this.anoReferencia = (new Date().getFullYear() - 1) + ':' + (new Date().getFullYear() + 1);
    this.botaoAgendarTodos = true;
    this.empresaGestoraID = '1'; // TODO
  }

  public preparaAgendarSelecionados() {
    console.log('preparaAgendarSelecionados...');
  }

  public preparaAgendarTodos() {
    console.log('preparaAgendarTodos...');
  }

  public preparaExecutarAgora(param: ClienteDTO) {
    console.log('preparaExecutarAgora...');
    this.cliente = JSON.parse(JSON.stringify(param));
  }

  // Ações do BOT
  public executarBotAgora() {
    // tslint:disable-next-line:max-line-length
    this.botPmjpService.agendarBot(this.cliente, new Date(), this.competencia).subscribe( up => {
      console.log(up);
    }, (err) => {
      console.log(err);
    }, () => {});
  }

  public executarBotSelecionados() {
    for (const clin of this.clientesSelecionados) {
      this.botPmjpService.agendarBot(clin, new Date(), this.competencia).subscribe(up => {
        console.log(up);
      }, (err) => {
        console.log(err);
      }, () => {
      });
    }
    this.clientesSelecionados = [];
  }

  public executarBotTodos() {
    // tslint:disable-next-line:max-line-length
    for (const clin of this.clientes) {
      this.botPmjpService.agendarBot(clin, new Date(), this.competencia).subscribe(up => {
        console.log(up);
      }, (err) => {
        console.log(err);
      }, () => {
      });
    }
  }

  buscar(){
    this.clienteFiltro.usuarioCadastroDTO.id = this.userAuth.id;
    this.clienteService.listar(this.clienteFiltro, 0, 10).subscribe(data => {
     this.page = data;
     this.clientes = data.content;
     this.size = data.size;
     this.totalElementos = data.totalElements;
    });
  }

  paginate(event) {
    this.clienteService.listar(this.clienteFiltro, event.page, event.rows)
      .subscribe((response) => {
        this.page = response;
        this.clientes = this.page.content;
        this.totalElementos = this.page.totalElements;
      });
  }

  loadClientes(event: LazyLoadEvent) {
    this.loading = true;

    if (String(event.filters.nomeFantasia?.value).length > 1) {
      this.clientes = this.clientes.filter((data) =>
        data.nomeFantasia.toUpperCase().startsWith(event.filters.nomeFantasia.value.toUpperCase()));
    }
    else if (event.filters.nomeFantasia.value === null || event.filters.nomeFantasia.value === '') {
      this.buscar();
    } else {
      this.buscar();
    }

    setTimeout(() => {
      if (this.clientes) {
        this.clientesFiltrados = this.clientes.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

  clienteSelecionado(event) {
    console.log(event);
    console.log(this.clientesSelecionados.length);
    if (this.clientesSelecionados.length > 0) {
      this.botaoAgendarTodos = false;
    } else {
      this.botaoAgendarTodos = true;
    }

  }

  downloadPorCompECliente(cliente: ClienteDTO): void {
    const mesCompStr = this.pipe.transform(this.competencia, 'MM');
    const anoCompStr = this.pipe.transform(this.competencia, 'yyyy');
    this.clienteService.downloadPorCompECliente(cliente, mesCompStr, anoCompStr)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = cliente.nomeFantasia + '-' + mesCompStr + '-' + anoCompStr + '.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }

  downloadPorCompEEmpresa(): void {
    const mesCompStr = this.pipe.transform(this.competencia, 'MM');
    const anoCompStr = this.pipe.transform(this.competencia, 'yyyy');
    this.clienteService.downloadPorCompEEmpresa(this.empresaGestoraID, mesCompStr, anoCompStr)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'todos.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }


}
