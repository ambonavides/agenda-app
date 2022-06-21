import { ConfiguracaoClienteDTO } from "./configuracao-clienteDTO";
import { EmpresaGestoraDTO } from "./empresa-gestoraDTO";
import { UsuarioDTO } from "./usuarioDTO";

export class ClienteDTO{
    id: number;
    codigo: string;
    nomeFantasia: string;
    cnpj: string;
    configuracaoClientesDTO: ConfiguracaoClienteDTO[];
    usuarioCadastroDTO: UsuarioDTO;

    constructor(){
        this.id = null;
        this.codigo = null;
        this.cnpj = null;
        this.nomeFantasia = null;
        this.configuracaoClientesDTO = new Array<ConfiguracaoClienteDTO>();
        this.usuarioCadastroDTO = new UsuarioDTO();
    }
}