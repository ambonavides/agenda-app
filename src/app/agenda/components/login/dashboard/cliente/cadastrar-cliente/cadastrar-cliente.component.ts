import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuperComponent } from 'src/app/agenda/components/super-component';
import { ClienteDTO } from 'src/app/agenda/model/clienteDTO';
import { SistemaDTO } from 'src/app/agenda/model/sistemaDTO';
import { ClienteService } from 'src/app/agenda/service/cliente-services';
import { SistemaService } from 'src/app/agenda/service/sistema-service';
import * as _ from 'lodash';
import { Message } from 'primeng/api';
import { UsuarioDTO } from 'src/app/agenda/model/usuarioDTO';
import { AuthService } from 'src/app/agenda/service/auth.service';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss']
})
export class CadastrarClienteComponent extends SuperComponent {

  sistemas: SistemaDTO[];
  sistemaSelected: SistemaDTO;
  userAuth: UsuarioDTO;
  msgs: Message[];

  path = 'pesquisar-cliente';
  cliente: ClienteDTO;
  clienteCadastro: ClienteDTO;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sistemaService: SistemaService,
    private authService: AuthService
  ) {
    super(modalService, router);
  }

  ngOnInit(){
    this.userAuth = this.authService.getUser();
    let id: any;
    let editar: any;
    this.cliente = new ClienteDTO();
    this.clienteCadastro = new ClienteDTO();
    
    this.sistemaService.listar().subscribe(
      retorno =>{
        this.sistemas = retorno;
      },
      err =>{
        this.msgs = [];
        this.msgs.push({severity:'error', detail:'Não foi possível exibir os dados!'});
      }
    );

    this.route.queryParams.subscribe(params =>{
      editar = params['edicao'] as boolean;
      this.isEdicao = JSON.parse(editar);
      id = params['id'];
      if(id !== null){
        this.clienteService.buscarPorId(id).subscribe(
          retorno =>{
            this.clienteCadastro = retorno;
          },
          err =>{
            if(!editar){
              this.msgs = [];
              this.msgs.push({severity:'error', detail:'Não foi possível buscar o cliente!'});
            }
          }
        )
      }
    });

  }

  public salvar() {
    console.log("chegou aqui");
      this.clienteCadastro.usuarioCadastroDTO.id = this.userAuth.id;
      this.clienteService.salvar(this.clienteCadastro).subscribe(
        data => {
          this.msgs = [];
          this.msgs.push({severity:'success', detail:'Cadastro realizado com sucesso!'});
        }, 
        err => {
            this.msgs = [];
            this.msgs.push({severity:'error', detail:'Não foi possível salvar o cliente!'});
        }
      );
      this.navigate(`/${this.path}`);
  }

  voltar(){
    this.limpar();
    this.navigate(`pesquisar-cliente`);
  }

  public limpar(){
    this.clienteCadastro = new ClienteDTO();
  }

}
