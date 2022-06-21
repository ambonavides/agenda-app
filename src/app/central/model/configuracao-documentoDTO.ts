import { EmpresaGestoraDTO } from "./empresa-gestoraDTO";
import { SistemaDTO } from "./sistemaDTO";

export class ConfiguracaoDocumentoDTO{

	id: number;
	descricaoServicoDeclaracaoPre: string;
	descricaoServicoDeclaracaoTom: string;
	descricaoArquivoLivroPre: string;
	descricaoArquivoLivroTom: string;
	descricaoArquivoXmlPre: string;
	descricaoArquivoXmlTom: string;
	descricaoArquivoIssPre: string;
	descricaoArquivoIssTom: string;

    constructor(){
        this.id = null;
        this.descricaoServicoDeclaracaoPre = null;
        this.descricaoServicoDeclaracaoTom = null;
        this.descricaoArquivoLivroPre = null;
        this.descricaoArquivoLivroTom = null;
        this.descricaoArquivoXmlPre = null;
        this.descricaoArquivoXmlTom = null;
        this.descricaoArquivoIssPre = null;
        this.descricaoArquivoIssTom = null;
    }

}