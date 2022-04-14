import LocalStoregeService from "./localstoregeService";
import ApiService from "../apiservice";

export const USUARIO_LOGADO = '_usuario_logado';
export const TOKEN = 'access_token';

export default  class AuthService{

    static isUsuarioAutenticado(){
        const usuario = LocalStoregeService.obterItem(USUARIO_LOGADO);
        if(usuario && usuario.id){
            return true
        }else{
            return false
        }
    }

    static removerUsuarioAutenticado(){
        LocalStoregeService.removerItem(USUARIO_LOGADO);
        LocalStoregeService.removerItem(TOKEN);
    }

    static logar(usuario,token){
        LocalStoregeService.adicionarItem(USUARIO_LOGADO, usuario);
        LocalStoregeService.adicionarItem(TOKEN, token);
        ApiService.registrarToken(token);
    }

    static obterusuarioAutenticado(){
        return LocalStoregeService.obterItem(USUARIO_LOGADO);
    }

    static refreshSesion(){
        const token = LocalStoregeService.obterItem(TOKEN);
        const usuario = AuthService.obterusuarioAutenticado();
        AuthService.logar(usuario,token);
        return usuario;
    }
}