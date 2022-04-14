import React from "react";
import UsuarioService from "../app/service/usuarioService";
import { AuthContext } from "../main/provedorAutenticacao";


class Home extends React.Component{
    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }
    state={
         nome:''
    }

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado;
        this.setState({ nome: usuarioLogado.nome })
    }
    
    render(){
        return (
            <div className="jumbotron">
                
                <span className="display-5">{this.state.nome}</span>
                <p className="lead">Essa é a tela Inicial.</p>
                <p className="lead">Em breve será criado o layout de informaçãoes</p>
                <hr className="my-4"/>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                      role="button">
                        <i className="pi pi-users"></i> Gerar Contrato
                    </a>
                    <a className="btn btn-danger btn-lg" 
                       role="button">
                        <i className="pi pi-money-bill"></i> Cadastrar Lançamento
                    </a>
                </p>
          </div>
            )
    }  
}

Home.contextType = AuthContext;

export default Home