import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credencias){
        return this.post('/autenticar', credencias);
    }
    validar(usuario){
        const erros = []

        if(!usuario.cpf){
            erros.push('O campo CPF é obrigatório.')
        }

      
       if(!usuario.senha){
            erros.push('Informe a Senha.')
        }

       

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}
export default UsuarioService;