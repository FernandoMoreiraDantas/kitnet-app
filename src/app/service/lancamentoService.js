import ApiService from "../apiservice";

import ErroValidacao from "../exception/ErroValidacao";

export default class LancamentoService extends ApiService{
    constructor(){
        super("/api/lancamentos")
    }

    obterListaMeses(){
        return [
            {label:'Selecione',value:''},
            {label:'Janeiro',value:'1'},
            {label:'Fevereiro',value:'2'},
            {label:'Março',value:'3'},
            {label:'Abril',value:'4'},
            {label:'Maio',value:'5'},
            {label:'Junho',value:'6'},
            {label:'Julho',value:'7'},
            {label:'Agosto',value:'8'},
            {label:'Setembro',value:'9'},
            {label:'Outrubro',value:'10'},
            {label:'Novembro',value:'11'},
            {label:'Dezembro',value:'12'}
        ]
    }

    obterListaTipos(){
        return [
            {label:'Selecione',value:''},
            {label:'Receita',value:'RECEITA'},
            {label:'Despesa',value:'DESPESA'}
        ]
    }


    salvar(lancamento){
        return this.post('/',lancamento);
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`,lancamento);
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    aletrarStatus(id, status){
        return this.put(`/${id}/atualizar-status`,{status}) 
    }

    validar(lancamento){
        const erros = [];

        if(!lancamento.descricao){
            erros.push("Informa a Descrição.");
        }

        if(!lancamento.ano){
            erros.push("Informe o ano.");
        }

        if(!lancamento.mes){
            erros.push("Informe o mês.");
        }

        if(!lancamento.valor){
            erros.push("Informe o valor.");
        }

        if(!lancamento.tipo){
            erros.push("Informe o tipo.");
        }


        if(erros && erros.length > 0 ){
            throw new ErroValidacao(erros);
        }

    }

    consultar(LancamentoFiltro){
        let params = `?ano=${LancamentoFiltro.ano}`

        if(LancamentoFiltro.mes){
            params = `${params}&mes=${LancamentoFiltro.mes}`
        }

        if(LancamentoFiltro.tipo){
            params = `${params}&tipo=${LancamentoFiltro.tipo}`
        }

        if(LancamentoFiltro.status){
            params = `${params}&status=${LancamentoFiltro.status}`
        }

        if(LancamentoFiltro.usuario){
            params = `${params}&usuario=${LancamentoFiltro.usuario}`
        }

        if(LancamentoFiltro.descricao){
            params = `${params}&descricao=${LancamentoFiltro.descricao}`
        }

        console.log(params);
        return this.get(params);
    }


    deletar(id){
        return this.delete(`/${id}`);
    }

}