import { UsuarioDTO } from "./usuarioDTO";

export class ClienteDTO{
    id: number;
    codigo: string;
    nomeFantasia: string;
    cnpj: string;
    usuarioCadastroDTO: UsuarioDTO;

    constructor(){
        this.id = null;
        this.codigo = null;
        this.cnpj = null;
        this.nomeFantasia = null;
        this.usuarioCadastroDTO = new UsuarioDTO();
    }
}