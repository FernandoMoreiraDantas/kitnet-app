import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-groups";
import { mensagemErro, mensagemSucesso } from "../../components/toastr";
import * as messages from "../../components/toastr"
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button'
import ReactInputMask from "react-input-mask";
import InquilinosTable from "./inquilinosTable";
import InquilinoService from "../../app/service/inquilinoService";

class ManterInquilinos extends React.Component{

    state = {
        id:'',
        cpf:'',
        nome:'',
        celular:'',
        atualizando:false,
        showConfirmDialog:false,
        inquilinoDeletar:{},
        inquilinos : []
    }

    constructor(){
        super();
        this.service = new InquilinoService();
    }

    componentDidMount(){
       this.buscar();
    }


    limparCampos = () =>{
        this.setState({id:'',cpf:'',nome:'',celular:'',atualizando:false});
       console.log(this.state);
    }

    salvar = () => {
        const {cpf, nome, celular} = this.state;
        const inquilino = {cpf, nome, celular}
        
        try {
            this.service.validar(inquilino);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(inquilino)
            .then(response => {
                mensagemSucesso('Inquilino cadastrado com Sucesso.')
                this.limparCampos();
                this.buscar();
                this.props.history.push('/manter-inquilinos')
            })
            .catch(error => {
                mensagemErro(error.response.data)
            })

    }

    buscar = () =>{     
        const inquilinoFitro = {
            cpf: this.state.cpf,
            nome: this.state.nome,
            celular: this.state.celular,
        }
 
        this.service
                    .consultar(inquilinoFitro)
                    .then(resposta =>{
                        const lista = resposta.data;
                        this.setState({inquilinos: lista})
                    }).catch(error =>{
                        console.log(error);
                    })
 
     }

     abrirConfirmacao = (inquilino) =>{
        this.setState({showConfirmDialog:true,inquilinoDeletar:inquilino});
    }

    cancelarDelecao = ()=>{
        this.setState({showConfirmDialog:false, inquilinoDeletar:{}})
    }
    
    deletar = () =>{
        this.service
             .deletar(this.state.inquilinoDeletar.id)
             .then(response => {
                 const inquilinos = this.state.inquilinos;
                 const index = inquilinos.indexOf(this.state.inquilinoDeletar);
                 inquilinos.splice(index,1);
                 this.setState({inquilinos:inquilinos,showConfirmDialog:false});
                 messages.mensagemSucesso('Inquilino deletado com Sucesso.!');
             }).catch(error =>{
                 messages.mensagemErro("Erro ao Excluir o Inquilino");
             })
     }


     editar = (inquilino) => {
        this.setState({id:inquilino.id,cpf:inquilino.cpf,nome:inquilino.nome,celular:inquilino.celular,atualizando:true});

     }

     alterar = () => {
        const {id, cpf, nome, celular} = this.state;
        const inquilino = {id,cpf, nome, celular}
        
        try {
            this.service.validar(inquilino);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.atualizar(inquilino)
            .then(response => {
                mensagemSucesso('Inquilino Atualizado com Sucesso.')
                this.limparCampos();
                this.buscar();
                this.props.history.push('/manter-inquilinos')
            })
            .catch(error => {
                mensagemErro(error.response.data)
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
            <Card title={this.state.atualizando ? "Atualização de Inquilinos" : "Cadastro de Inquilinos"}>
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
                                        value={this.state.celular}
                                        className="form-control"
                                        id="inputCelular"                                        
                                        placeholder="Digite o Celular"
                                        onChange={e => this.setState({ celular: e.target.value })} />

                                </FormGroup>
                                 <br />                         
                                                                
                                {this.state.atualizando
                                    ?
                                        (   <>
                                                <button className="btn btn-primary"
                                                    onClick={this.alterar}>
                                                    <i className="pi pi-refresh" /> Atualizar
                                                </button>
                                                <button className="btn btn-danger"
                                                        onClick={this.limparCampos}>
                                                        <i className="pi pi-ban" /> Limpar
                                                </button>
                                            </>
                                       )
                                    : 
                                    ( <>
                                        <button className="btn btn-success"
                                            onClick={this.salvar}>
                                            <i className="pi pi-save" /> Salvar
                                        </button>
                                        <button className="btn btn-warning"
                                                onClick={this.buscar}>
                                                <i className="pi pi-filter" /> Filtrar
                                        </button> 
                                      </>
                                    )

                                }                                       
                                
                            </fieldset>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <InquilinosTable
                            inquilinos={this.state.inquilinos}
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
                        Confirma a exclusão deste Inquilino?
                    </Dialog>
                </div>
            </Card>
        )
    }


}
export default withRouter(ManterInquilinos);