import { ClienteDTO } from "./clienteDTO";
import { ConfiguracaoDocumentoDTO } from "./configuracao-documentoDTO";
import { UsuarioDTO } from "./usuarioDTO";

export class EmpresaGestoraDTO {
    id: number;
    nome: string;
    descricao: string;
    cnpj: string;
    telefone: string;
    usuarioDTO: UsuarioDTO;
    usuarioCadastroDTO: UsuarioDTO;
    configuracaoDocumentoDTO: ConfiguracaoDocumentoDTO;
    clientesDTO: ClienteDTO[];

    constructor(){
        this.id = null;
        this.nome = null;
        this.descricao = null;
        this.cnpj = null;
        this.telefone = null;
        this.usuarioDTO = new UsuarioDTO();
        this.usuarioCadastroDTO = new UsuarioDTO();
        this.configuracaoDocumentoDTO = new ConfiguracaoDocumentoDTO();
        this.clientesDTO = new Array<ClienteDTO>();
    }
}