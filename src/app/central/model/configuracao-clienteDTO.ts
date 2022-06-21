import { ClienteDTO } from "./clienteDTO"
import { SistemaDTO } from "./sistemaDTO";

export class ConfiguracaoClienteDTO{

    id: number
	sistemaDTO: SistemaDTO;
	
	flagDeclaracaoPre: boolean;
	flagDeclaracaoTom: boolean;

	flagLivroPre: boolean;
	flagLivroTom: boolean;
	
	flagXmlPre: boolean;
	flagXmlTom: boolean;
	
	flagIssPre: boolean;
	flagIssTom: boolean;
	
    login: string;
	senha: string;

    botAtivo: boolean;

    constructor(){
        this.id = null;
        this.sistemaDTO = new SistemaDTO;
        this.flagDeclaracaoPre = false;
        this.flagDeclaracaoTom = false;
        this.flagLivroPre = false;
        this.flagLivroTom = false;
        this.flagXmlPre = false;
        this.flagXmlTom = false;
        this.login = null;
        this.senha = null;
        this.botAtivo = true;
    }

}