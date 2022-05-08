import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-groups";
import {withRouter} from "react-router-dom";
import UsuarioService from "../app/service/usuarioService";
import {mensagemErro} from '../components/toastr'
import { AuthContext } from "../main/provedorAutenticacao";
import ReactInputMask from "react-input-mask";

class Login extends React.Component{

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    componentDidMount() {
       this.context.encerrarSessao();
    }

    state={
        cpf:'',
        senha:''
    }

    entrar = () => {
        if(!this.state.cpf){
            mensagemErro('Informe o CPF');
            return false;
        }

        if(!this.state.senha){
            mensagemErro('Informe a Sennha');
            return false;
        }

        this.service.autenticar({ cpf: this.state.cpf, senha: this.state.senha })
            .then(response => {
                this.context.iniciarSessao(response.data)                
                this.props.history.push('/home')
            }).catch(erro => {
                mensagemErro(erro.response.data)
            })
    }

    render(){
        return(
               <div className="row">
                   <div className="col-md-6 offset-md-3">
                        <div className="bs-docs-section">
                            <Card title="Login">
                               <div className="row">
                                    <div className="col-lg-12"> 
                                            <div className="bs-Component">
                                                <fieldset>
                                                    <FormGroup label="CPF:*" htmlFor="cpf">
                                                    <ReactInputMask
                                                        mask={'999.999.999-99'}
                                                        value={this.state.cpf}
                                                               onChange={e => this.setState({cpf:e.target.value})} 
                                                               className="form-control"
                                                               id="cpf"
                                                               aria-describedby="emailHelp"
                                                               placeholder="Digite o CPF"/>

                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup label="Senha:*" htmlFor="senha">
                                                        <input type="password" 
                                                               value={this.senha}
                                                               onChange={e => this.setState({senha:e.target.value})}
                                                               className="form-control"
                                                               id="senha"
                                                               aria-describedby="emailHelp"
                                                               placeholder="Password"/>

                                                    </FormGroup>
                                                    <br/>
                                                    <button onClick={this.entrar} 
                                                            className="btn btn-success">                                                                
                                                               <i className="pi pi-sign-in"/> Entrar
                                                    </button>
                                                    
                                                </fieldset>
                                            </div>
                                    </div>
                                </div>
                            </Card>
                            
                        </div>
                   </div>
               </div>
        )
    }
}

Login.contextType = AuthContext;

export default withRouter(Login)
