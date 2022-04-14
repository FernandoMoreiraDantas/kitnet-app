export default class LocalStoregeService{

    static adicionarItem(chave,valor){
        localStorage.setItem(chave, JSON.stringify(valor));
    }   

    static obterItem(chave){
        return JSON.parse(localStorage.getItem(chave));
    }

    static removerItem(chave){
        return localStorage.removeItem(chave);
    }
}