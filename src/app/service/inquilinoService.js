import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class InquilinoService extends ApiService{
    constructor(){
        super('/api/inquilinos')
    }

    salvar(inquilino){
        return this.post('', inquilino);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    atualizar(inquilino){
        return this.put(`/${inquilino.id}`,inquilino);
    }

    consultar(InquilinoFiltro){
        let params = `?id=${1}`

        if(InquilinoFiltro.cpf){
            params = `${params}&cpf=${InquilinoFiltro.cpf}`
        }    

        if(InquilinoFiltro.nome){
            params = `${params}&nome=${InquilinoFiltro.nome}`
        }

        if(InquilinoFiltro.celular){
            params = `${params}&celular=${InquilinoFiltro.celular}`
        }
        return this.get(params);
    }

    validar(inquilino){
        const erros = []

        if(!inquilino.cpf){
            erros.push('O campo CPF é obrigatório.')
        }      
       if(!inquilino.nome){
            erros.push('Informe o Nome.')
        }

        if(!inquilino.celular){
            erros.push('Informe o Celular.')
        }       

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}
export default InquilinoService;