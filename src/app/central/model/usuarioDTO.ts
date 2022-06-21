export class UsuarioDTO{
    id: number;    
    login: string;
    senha: string;
    email: string;
    ativo: boolean;

    constructor(){
        this.id = null;
        this.login = null;
        this.senha = null;
        this.email = null;
        this.ativo = null;
    }

}