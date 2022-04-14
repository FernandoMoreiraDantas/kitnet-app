import React from "react";

import Card from "../components/card";
import FormGroup from "../components/form-groups";
import { withRouter } from "react-router-dom";
import * as messages from "../components/toastr";

import UsuarioService from "../app/service/usuarioService";
import { mensagemErro, mensagemSucesso } from "../components/toastr";
import ReactInputMask from "react-input-mask";


class CadastroUsuario extends React.Component {
    state = {
        cpf: '',
        nome: '',
        fone:'',
        senha: '',
        senhaRepeticao: '',
        atualizando: false

    }

    constructor() {
        super()
        this.service = new UsuarioService();
    }

    componentDidMount() {
        const params = this.props.match.params
        console.log(params);
        if (params.cpf) {
            this.service.obterPorId(params.cpf)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        }
    }


    validar(){
        
    }

    alterar = () => {
        const { cpf, nome, fone } = this.state;
        const usuario = { cpf, nome, fone }

        try {
            this.service.validarManter(usuario);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => {
                messages.mensagemErro(msg)
            });
            return false;
        }

        this.service
        .atualizar(usuario)
        .then(response => {
            this.props.history.push('/manter-usuarios')
            messages.mensagemSucesso('Usuario Alterado com sucesso!');
        }).catch(error => {
            console.log(error.response.data);
            messages.mensagemErro(error.response.data);
        })



    }
    salvar = () => {
        const {cpf, nome,fone, senha, senhaRepeticao} = this.state;
        const usuario = {cpf, nome,fone, senha, senhaRepeticao}
        
        try {
            this.service.validar(usuario);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com Sucesso.')
                this.props.history.push('/manter-usuarios')
            })
            .catch(error => {
                mensagemErro(error.response.data)
            })

    }
    cancelar = () => {
        this.props.history.push('/manter-usuarios')
    }

    render() {
        return (
            <Card title={this.state.atualizando ? "Atualização de Usuários" : "Cadastro de Usuários"}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-Component">
                            <fieldset>
                            <FormGroup label="CPF:*" htmlFor="inputCPF">
                                    <ReactInputMask 
                                        mask={'999.999.999-99'}
                                        value={this.state.cpf}
                                        className="form-control"
                                        id="inputCPF"
                                        aria-describedby="emailHelp"
                                        placeholder="Digite o CPF"
                                        onChange={e => this.setState({ cpf: e.target.value })}                        
                                    
                                    />
                                </FormGroup>
                                <br />
                                <FormGroup label="Nome:*" htmlFor="inputNome">
                                    <input type="text"
                                        value={this.state.nome}
                                        className="form-control"
                                        id="inputNome"
                                        placeholder="Digite o nome"
                                        name="nome"
                                        onChange={e => this.setState({ nome: e.target.value })} />

                                </FormGroup>
                                <br />
                                <FormGroup label="Celular:*" htmlFor="inputCelular">
                                <ReactInputMask 
                                        mask={'(99)99999-9999'}
                                        value={this.state.fone}
                                        className="form-control"
                                        id="inputCelular"
                                        aria-describedby="emailHelp"
                                        placeholder="Digite o Celular"
                                        onChange={e => this.setState({ fone: e.target.value })} />

                                </FormGroup>
                                <br />
                                <FormGroup label="Senha:*" htmlFor="inputSenha">
                                    <input type="password"
                                        value={this.senha}
                                        className="form-control"
                                        id="inputSenha"
                                        placeholder="Password"
                                        onChange={e => this.setState({ senha: e.target.value })} />

                                </FormGroup>
                                <br />
                                <FormGroup label="Confirme a Senha:*" htmlFor="inputSenhaRepetida">
                                    <input type="password"
                                        value={this.senhaRepeticao}
                                        className="form-control"
                                        id="inputSenhaRepetida"
                                        placeholder="Confirme a senha"
                                        onChange={e => this.setState({ senhaRepeticao: e.target.value })} />

                                </FormGroup>
                                <br />
                                
                                {this.state.atualizando
                                    ?
                                    (<button className="btn btn-primary"
                                        onClick={this.alterar}>
                                        <i className="pi pi-refresh" /> Atualizar
                                    </button>)
                                    : (<button className="btn btn-success"
                                        onClick={this.salvar}>
                                        <i className="pi pi-save" /> Salvar
                                    </button>)

                                }

                                <button onClick={this.cancelar} 
                                        className="btn btn-danger">
                                           <i className="pi pi-times"/> Cancelar
                                </button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)