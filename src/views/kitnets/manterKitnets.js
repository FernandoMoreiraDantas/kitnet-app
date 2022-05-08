import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-groups";
import { mensagemErro, mensagemSucesso } from "../../components/toastr";
import * as messages from "../../components/toastr"
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button'
import kitnetService from "../../app/service/kitnetService";
import KitNetsTable from "./kitNetsTable";

class ManterKitnets extends React.Component{

    state = {
        id:'',
        nome:'',
        descricao:'',
        situacao:'DESOCUPADO',
        atualizando:false,
        showConfirmDialog:false,
        kitnetDeletar:{},
        kitnets : []
    }

    constructor(){
        super();
        this.service = new kitnetService();
    }

    componentDidMount(){
       this.buscar();
    }


    limparCampos = () =>{
        this.setState({id:'',nome:'',descricao:'',situacao:'DESOCUPADO',atualizando:false});
    }

    salvar = () => {
        const {nome, descricao, situacao} = this.state;
        const kitnet = {nome, descricao, situacao}
        
        try {
            this.service.validar(kitnet);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(kitnet)
            .then(response => {
                mensagemSucesso('Kitnet cadastrada com Sucesso.')
                this.limparCampos();
                this.buscar();
                this.props.history.push('/manter-kitnets')
            })
            .catch(error => {
                mensagemErro(error.response.data)
            })

    }

    buscar = () =>{     
        const kitnetFitro = {
            nome: this.state.nome,
            descricao: this.state.descricao
          
        }
        this.service
                    .consultar(kitnetFitro)
                    .then(resposta =>{
                        const lista = resposta.data;
                        this.setState({kitnets: lista})
                    }).catch(error =>{
                        console.log(error);
                    })
 
     }

     abrirConfirmacao = (kitnet) =>{
        this.setState({showConfirmDialog:true,kitnetDeletar:kitnet});
    }

    cancelarDelecao = ()=>{
        this.setState({showConfirmDialog:false, kitnetDeletar:{}})
    }
    
    deletar = () =>{
        this.service
             .deletar(this.state.kitnetDeletar.id)
             .then(response => {
                 const kitnets = this.state.kitnets;
                 const index = kitnets.indexOf(this.state.kitnetDeletar);
                 kitnets.splice(index,1);
                 this.setState({kitnets:kitnets,showConfirmDialog:false});
                 messages.mensagemSucesso('Kitnet deletada com Sucesso.!');
             }).catch(error =>{
                 messages.mensagemErro("Erro ao Excluir a Kitnet");
             })
     }


     editar = (kitnet) => {
        this.setState({id:kitnet.id,nome:kitnet.nome,descricao:kitnet.descricao,situacao:kitnet.situacao,atualizando:true});

     }

     alterar = () => {
        const {id, nome, descricao, situacao} = this.state;
        const kitnet = {id, nome, descricao, situacao}
        
        try {
            this.service.validar(kitnet);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.atualizar(kitnet)
            .then(response => {
                mensagemSucesso('Kitnet Atualizada com Sucesso.')
                this.limparCampos();
                this.buscar();
                this.props.history.push('/manter-kitnets')
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
            <Card title={this.state.atualizando ? "Atualização de KitNets" : "Cadastro de KitNets"}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-Component">
                            <fieldset>
                            <div className="row">
                                <div className="col-lg-4">
                                    <FormGroup label="Nome:*" htmlFor="inputNome">
                                        <input type="text"
                                            value={this.state.nome}
                                            className="form-control"
                                            id="inputNome"
                                            placeholder="Digite o nome"
                                            onChange={e => this.setState({ nome: e.target.value })} />
                                    </FormGroup>
                                </div>
                                <div className="col-lg-4">    
                                    <FormGroup label="Situação:" htmlFor="inputSituacao">
                                        <input type="text"
                                            value={this.state.situacao}
                                            className="form-control"
                                            id="inputSituacao"
                                            disabled
                                            onChange={e => this.setState({ situacao: e.target.value })} />
                                    </FormGroup>
                                </div>
                            </div>        
                               
                                <br />
                                <FormGroup label="Descrição:*" htmlFor="inputDesc">
                                    <input type="text"
                                        value={this.state.descricao}
                                        className="form-control"
                                        id="inputDesc"
                                        placeholder="Digite a Descrição"
                                        onChange={e => this.setState({ descricao: e.target.value })} />

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
                            <KitNetsTable
                            kitnets={this.state.kitnets}
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
                        Confirma a exclusão da Kitnet?
                    </Dialog>
                </div>
            </Card>
        )
    }


}
export default withRouter(ManterKitnets);