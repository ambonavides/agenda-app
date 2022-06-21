import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/api';
import { SuperComponent } from 'src/app/central/components/super-component';
import { ClienteDTO } from 'src/app/central/model/clienteDTO';
import { ConfiguracaoDocumentoDTO } from 'src/app/central/model/configuracao-documentoDTO';
import { EmpresaGestoraDTO } from 'src/app/central/model/empresa-gestoraDTO';
import { UsuarioDTO } from 'src/app/central/model/usuarioDTO';
import { AuthService } from 'src/app/central/service/auth.service';
import { EmpresaService } from 'src/app/central/service/empresa-service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.scss']
})
export class CadastrarEmpresaComponent extends SuperComponent {

  path = 'pesquisar-empresa';
  empresaGestoraDTO: EmpresaGestoraDTO;
  userAuth: UsuarioDTO;
  msgs: Message[];

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
) {
  super(modalService, router);
}

  ngOnInit(): void {
    this.userAuth = this.authService.getUser();
    let id: any;
    let editar: any;
    this.empresaGestoraDTO = new EmpresaGestoraDTO();
    this.route.queryParams.subscribe(params =>{
      editar = params['edicao'] as boolean;
      this.isEdicao = JSON.parse(editar);
      id = params['id'];
      if(id !== null){
        this.empresaService.buscarPorId(id).subscribe(retorno =>{
          this.empresaGestoraDTO = retorno;
        })
      }
    });
  }

  public salvar(){
    this.empresaGestoraDTO.usuarioCadastroDTO.id = this.userAuth.id;
    this.empresaService.salvar(this.empresaGestoraDTO).subscribe(
      data =>{
        this.msgs = [];
        this.msgs.push({severity:'succes', detail:'Dados cadastrados com sucesso!'});
        this.navigate(`/${this.path}`);
      }, 
      err =>{
        this.msgs = [];
        this.msgs.push({severity:'error', detail:'Não foi possível salvar os dados!'});
      }
    );
  }

  voltar(){
    this.limpar();
    this.navigate(`pesquisar-empresa`);
  }

  public limpar(){
    this.empresaGestoraDTO = new EmpresaGestoraDTO();
  }

}
