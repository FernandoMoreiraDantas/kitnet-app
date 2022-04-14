import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credencias){
        return this.post('/autenticar', credencias);
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }


    salvar(usuario){
        return this.post('', usuario);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    atualizar(usuario){
        return this.put(`/${usuario.cpf}`,usuario);
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    consultar(UsuarioFiltro){
        let params = `?codigo=${1}`

        if(UsuarioFiltro.cpf){
            params = `${params}&cpf=${UsuarioFiltro.cpf}`
        }    

        if(UsuarioFiltro.nome){
            params = `${params}&nome=${UsuarioFiltro.nome}`
        }

        if(UsuarioFiltro.fone){
            params = `${params}&fone=${UsuarioFiltro.fone}`
        }
        console.log(params);
        return this.get(params);
    }



    validar(usuario){
        const erros = []

        if(!usuario.cpf){
            erros.push('O campo CPF é obrigatório.')
        }

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório.')
        }

        if(!usuario.fone){
            erros.push('O campo Celular é obrigatório.')
        }

        if(!usuario.senha){
            erros.push('Informe a Senha.')
        }

        if(!usuario.senhaRepeticao){
            erros.push('Informe a Confirmação de senha.')
        }


        if(usuario.senha && usuario.senhaRepeticao && usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas não Conferem.')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    validarManter(usuario){
        const erros = []

        if(!usuario.cpf){
            erros.push('O campo CPF é obrigatório.')
        }

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório.')
        }

        if(!usuario.fone){
            erros.push('O campo Celular é obrigatório.')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

}
export default UsuarioService;