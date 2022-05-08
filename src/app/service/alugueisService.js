import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";


class alugueisService extends ApiService{

    state = {
        listaAlugueis : []
    }

    constructor(){
        super('/api/alugueis')
    }

    salvar(aluguel){
        return this.post('', aluguel);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    atualizar(aluguel){
        return this.put(`/${aluguel.id}`,aluguel);
    }

    consultar(aluguelFiltro){
        console.log('filtro', aluguelFiltro);
        let params = `?id=${1}`

        if(aluguelFiltro.inquilino){
            params = `${params}&inquilino=${aluguelFiltro.inquilino}`
        }    

        if(aluguelFiltro.kitnet){
            params = `${params}&kitnet=${aluguelFiltro.kitnet}`
        }
        return this.get(params);
    }

    validar(aluguel){
        const erros = []

        console.log('Dados:', aluguel);

        if(!aluguel.inquilino.id){
            erros.push('Informe o Inquilino.')
        }  

        if(!aluguel.kitnet.id){
            erros.push('Informe a kitnet.')
        }  

        if(!aluguel.dataIni){
            erros.push('Informe a Data de Início.')
        }      
       if(!aluguel.valor){
            erros.push('Informe o valor..')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}
export default alugueisService;