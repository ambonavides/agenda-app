import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from 'ts-md5/dist/md5';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperComponent } from 'src/app/central/components/super-component';
import { EmpresaGestoraDTO } from 'src/app/central/model/empresa-gestoraDTO';
import { Page } from 'src/app/central/model/page';
import { EmpresaService } from 'src/app/central/service/empresa-service';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/central/service/auth.service';
import { UsuarioDTO } from 'src/app/central/model/usuarioDTO';

@Component({
  selector: 'app-manter-empresa',
  templateUrl: './pesquisar-empresa.component.html',
  styleUrls: ['./pesquisar-empresa.component.scss']
})
export class PesquisarEmpresaComponent extends SuperComponent {

  path = 'pesquisar-empresa';
  empresas: EmpresaGestoraDTO[] = [];
  empresa: EmpresaGestoraDTO;
  empresaCadastro: EmpresaGestoraDTO;
  empresaFiltro: EmpresaGestoraDTO;
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
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private authService: AuthService
) {
  super(modalService, router);
}

  ngOnInit(): void {
    this.empresa = new EmpresaGestoraDTO();
    this.empresaCadastro = new EmpresaGestoraDTO();
    this.empresaFiltro = new EmpresaGestoraDTO();
    this.userAuth = this.authService.getUser();
    this.buscar();
  }

  buscar(){
    this.empresaFiltro.usuarioDTO = new UsuarioDTO();
    this.empresaFiltro.usuarioDTO.id = this.userAuth.id;
    this.empresaFiltro.usuarioCadastroDTO.id = this.userAuth.id;
    this.empresaService.listar(this.empresaFiltro, 0, 10).subscribe(data =>{
     this.page = data;
     this.empresas = data.content;
     this.size = data.size;
     this.totalElementos = data.totalElements;
    },
    err => {
      this.msgs = [];
      this.msgs.push({severity:'error', detail:'Não foi possível exibir os dados!'});
    });
  }

  novo(){
    this.navigateParams(`cadastrar-empresa`, this.empresa.id, true);
  }

  paginate(event) {
    this.empresaService.listar(this.empresaFiltro, event.page, event.rows)
      .subscribe((response) => {
        this.page = response;
        this.empresas = this.page.content;
        this.totalElementos = this.page.totalElements;
      },
      err => {
        this.msgs = [];
        this.msgs.push({severity:'error', detail:'Não foi possível exibir os dados!'});
      }
    );
  }

  public salvar(){
    let hashPassword = Md5.hashStr(this.empresaCadastro.usuarioDTO.senha) as string;
    this.empresaCadastro.usuarioDTO.senha = hashPassword;
    this.empresaService.salvar(this.empresaCadastro).subscribe(
      data =>{
        this.buscar();
        this.close();
        this.navigate(`/${this.path}`);
      }, err =>{
        this.msgs = [];
        this.msgs.push({severity:'succes', detail:'Dados cadastrados com sucesso!'});
      }
    );
  }

  public alterar(){
    let hashPassword = Md5.hashStr(this.empresa.usuarioDTO.senha) as string;
    this.empresa.usuarioDTO.senha = hashPassword;
    this.empresaService.alterar(this.empresa).subscribe(
      data =>{
        this.buscar();
        this.close();
        this.navigate(`/${this.path}`);
      }, erro =>{
        console.log(erro);
      }
    );
  }

  public limpar(){
    this.empresaCadastro = new EmpresaGestoraDTO();
    this.empresa = new EmpresaGestoraDTO();
    this.empresaFiltro = new EmpresaGestoraDTO();
  }

  public close(){
    this.limpar();
    super.close();
  }

  public editar(param: EmpresaGestoraDTO, editar: boolean){
    this.isEdicao = editar;
    this.empresa = JSON.parse(JSON.stringify(param));
    this.navigateParams(`cadastrar-empresa`, this.empresa.id, this.isEdicao);
  }

  public remover(param: EmpresaGestoraDTO){
    this.empresa = param;
  }

  public confirmaRemover(){
    this.empresaService.remover(this.empresa).subscribe(response =>{
      this.buscar();
      this.close();
      this.navigate(`/${this.path}`);
    }), erro=>{
      console.log(erro);
    };
  }

}
