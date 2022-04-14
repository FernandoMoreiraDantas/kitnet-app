import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-groups";
import UsuariosTable  from "./usuariosTable";
import LocalStoregeService from "../../app/service/localstoregeService";
import * as messages from "../../components/toastr"
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button'
import ReactInputMask from "react-input-mask";
import UsuarioService from "../../app/service/usuarioService";
                      
class ManterUsuarios extends React.Component{

    state = {
        cpf:'',
        nome:'',
        fone:'',
        showConfirmDialog:false,
        usuarioDeletar:{},
        usuarios : []
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

   

    prepareCadastrar = () =>{
        this.props.history.push('/cadastro-usuarios/');
    }
   

    buscar = () =>{  
         const usuarioFitro = {
           cpf: this.state.cpf,
           nome: this.state.nome,
           fone: this.state.fone
       }

       this.service
                   .consultar(usuarioFitro)
                   .then(resposta =>{
                       const lista = resposta.data;
                       if(lista.length < 1){
                           messages.mensagemAlerta("Nenhum Resultado Encontrado");
                       }
                       this.setState({usuarios: lista})
                   }).catch(error =>{
                       console.log(error);
                   })

    }

    editar = (cpf) => {
       this.props.history.push(`/cadastro-usuarios/${cpf}`)
    }

    abrirConfirmacao = (usuario) =>{
        this.setState({showConfirmDialog:true,usuarioDeletar:usuario});
    }

    limpar = () => {
        this.setState({cpf:'',nome:'',fone:''})
     }

    cancelarDelecao = ()=>{
        this.setState({showConfirmDialog:false, usuarioDeletar:{}})
    }


    deletar = () =>{
       this.service
            .deletar(this.state.usuarioDeletar.cpf)
            .then(response => {
                const usuarios = this.state.usuarios;
                const index = usuarios.indexOf(this.state.usuarioDeletar);
                usuarios.splice(index,1);
                this.setState({usuarios:usuarios,showConfirmDialog:false});
                messages.mensagemSucesso('Usuário deletado com Sucesso.!');
            }).catch(error =>{
                messages.mensagemErro("Erro ao deletar o usuário");
            })
    }

    render(){
        const confirmDialogfooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

       
        return(
            <Card title="Consulta de Usuários">
            <div className="row">
                <div className="col-lg-6">
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
                            <br/>
                            <button  onClick={this.buscar} 
                                     type="button"
                                     className="btn btn-success">
                                        <i className="pi pi-search"/> Buscar
                            </button>
                            <button onClick={this.prepareCadastrar}
                                    type="button"
                                    className="btn btn-danger" >
                                        <i className="pi pi-plus"/> Cadastrar
                            </button>         
                            <button onClick={this.limpar}
                                    type="button"
                                    className="btn btn-danger" >
                                        <i className="pi pi-clear"/> Limpar
                            </button>                    
                            
                           
                        </fieldset>
                    </div>
                </div>
            </div>
            <br/> 
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <UsuariosTable 
                            usuarios={this.state.usuarios}
                            deleteAction={this.abrirConfirmacao}
                            editAction={this.editar}
                        />
                    </div>
                </div>
            </div>
            <div>
                    <Dialog header="Confirmação"
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }}
                        footer={confirmDialogfooter}
                        modal={true}
                        onHide={() => this.setState({showConfirmDialog:false})}>
                        Confirma a exclusão deste Usuário?
                    </Dialog>
            </div>
            
        </Card>


            
        )
    }


}
export default withRouter(ManterUsuarios);