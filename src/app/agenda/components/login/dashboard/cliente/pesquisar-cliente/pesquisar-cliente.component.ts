import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/api';
import { SuperComponent } from 'src/app/agenda/components/super-component';
import { ClienteDTO } from 'src/app/agenda/model/clienteDTO';
import { Page } from 'src/app/agenda/model/page';
import { UsuarioDTO } from 'src/app/agenda/model/usuarioDTO';
import { AuthService } from 'src/app/agenda/service/auth.service';
import { ClienteService } from 'src/app/agenda/service/cliente-services';
import { UserService } from 'src/app/agenda/service/user.service';

@Component({
  selector: 'app-pesquisar-cliente',
  templateUrl: './pesquisar-cliente.component.html',
  styleUrls: ['./pesquisar-cliente.component.scss']
})
export class PesquisarClienteComponent extends SuperComponent {

  path = 'cliente';
  clientes: ClienteDTO[] = [];
  cliente: ClienteDTO;
  clienteCadastro: ClienteDTO;
  clienteFiltro: ClienteDTO;
  closeResult: string;
  page: Page;
  size: number;
  totalElementos: number;
  formulario: FormGroup;
  msgs: Message[];
  userAuth: UsuarioDTO;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    super(modalService, router);
  }

  ngOnInit(): void {
    this.userAuth = this.authService.getUser();
    this.cliente = new ClienteDTO();
    this.clienteCadastro = new ClienteDTO();
    this.clienteFiltro = new ClienteDTO();
    this.buscar();

  }

  novo(){
    this.navigateParams(`cadastrar-cliente`, this.cliente.id, true);
  }

  buscar() {
    this.clienteFiltro.usuarioCadastroDTO.id = this.userAuth.id;
    this.clienteService.listar(this.clienteFiltro, 0, 10).subscribe(
      data => {
        this.page = data;
        this.clientes = data.content;
        this.size = data.size;
        this.totalElementos = data.totalElements;
      },
      err =>{
        this.msgs = [];
        this.msgs.push({severity:'error', detail:'Não foi possível exibir os dados!'});
      }
    );
  }

  paginate(event) {
    this.clienteService.listar(this.clienteFiltro, event.page, event.rows)
    .subscribe(
      data => {
      this.page = data;
      this.clientes = this.page.content;
      this.totalElementos = this.page.totalElements;
      },
      err => {
        this.msgs = [];
        this.msgs.push({severity:'error', detail:'Não foi possível alterar os dados!'});
      }
    );
  }

  public alterar() {
    this.clienteService.alterar(this.cliente).subscribe(
      data => {
        this.buscar();
        this.close();
        this.navigate(`/${this.path}`);
        this.msgs = [];
        this.msgs.push({severity:'success', detail:'Dados alterado com sucesso!'});
      },
      err => {
        this.msgs = [];
        this.msgs.push({severity:'error', detail:'Não foi possível alterar os dados!'});
      }
    );
  }

  public limpar() {
    this.clienteCadastro = new ClienteDTO();
    this.cliente = new ClienteDTO();
    this.clienteFiltro = new ClienteDTO();
  }

  public close() {
    this.limpar();
    super.close();
  }

  public editar(param: ClienteDTO, editar: boolean) {
    this.isEdicao = editar;
    this.cliente = JSON.parse(JSON.stringify(param));
    this.navigateParams(`cadastrar-cliente`, this.cliente.id, this.isEdicao);
  }

  public remover(cliente: ClienteDTO) {
    this.cliente = cliente;
  }

  public confirmaRemover() {
    this.clienteService.remover(this.cliente).subscribe(
      response => {
        this.buscar();
        this.close();
        this.navigate(`/${this.path}`);
      },
      err =>{
        this.msgs = [];
        this.msgs.push({severity:'error', detail:'Não foi possível remover os dados!'});
      }
    )
  }



}
