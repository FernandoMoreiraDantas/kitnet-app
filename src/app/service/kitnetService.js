import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class KitnetService extends ApiService{
    constructor(){
        super('/api/kitnets')
    }

    salvar(kitnet){
        return this.post('', kitnet);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    atualizar(kitnet){
        return this.put(`/${kitnet.id}`,kitnet);
    }

    consultar(kitnetFiltro){
        let params = `?id=${1}`

        if(kitnetFiltro.nome){
            params = `${params}&nome=${kitnetFiltro.nome}`
        }    

        if(kitnetFiltro.descricao){
            params = `${params}&descricao=${kitnetFiltro.descricao}`
        }

        if(kitnetFiltro.situacao){
            params = `${params}&situacao=${kitnetFiltro.situacao}`
        }
        console.log(params);
        return this.get(params);
    }

    validar(kitnet){
        const erros = []

        if(!kitnet.nome){
            erros.push('Informe o nome.')
        }      
       if(!kitnet.descricao){
            erros.push('Informe a descrição.')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}
export default KitnetService;