import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-groups";
import { mensagemErro, mensagemSucesso } from "../../components/toastr";
import * as messages from "../../components/toastr"
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button'
import SelectMenu from "../../components/select-menu";
import alugueisService from "../../app/service/alugueisService";
import ReactInputMask from "react-input-mask";

import AlugueisTable from "./alugueisTable";
import InquilinoService from "../../app/service/inquilinoService";
import KitnetService from "../../app/service/kitnetService";

class ManterAlugueis extends React.Component{

    state = {
        id:'',
        idInquilino:'',
        listaInquilinos:[],
        idKitnet:'',
        listaKitnets:[],
        dataIni:'',
        dataFim:'',
        valor:'',
        
        atualizando:false,
        showConfirmDialog:false,
        aluguelDeletar:{},
        alugueis : []        
    }

    constructor(){
        super();
        this.service = new alugueisService();
        this.serviceInquilino = new InquilinoService();
        this.kitnetService = new KitnetService();
    }

    componentDidMount(){
       this.montarListaInquilinos();
       this.montarListaKitnets({situacao:'DESOCUPADO'});    
       this.buscar();
    }

    montarListaKitnets = (kitnetFiltro) =>{     
             this.kitnetService
                    .consultar(kitnetFiltro)
                    .then(resposta =>{
                        const lista = resposta.data;
                        this.setState({listaKitnets: lista})
                    }).catch(error =>{
                        console.log(error);
                    })
 
     }

     montarListaInquilinos = () =>{     
        this.serviceInquilino
                     .consultar({})
                     .then(resposta =>{
                         const lista = resposta.data;
                         this.setState({listaInquilinos: lista})
                     }).catch(error =>{
                         console.log(error);
                     })
  
      }


    limparCampos = () =>{
        this.setState({id:'',dataIni:'',dataFim:'',valor:'',idInquilino:'',idKitnet:'',kitnetatualizando:false});
    }

    salvar = () => {
        
        const {idInquilino, idKitnet, dataIni,dataFim,valor} = this.state;
        const inquilino = {id:idInquilino}
        const kitnet = {id:idKitnet}
        const aluguel = {dataIni,dataFim,valor,inquilino,kitnet}
        
        try {
            this.service.validar(aluguel);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(aluguel)
            .then(response => {
                mensagemSucesso('Aluguel cadastrado com Sucesso.')
                this.limparCampos();
                this.buscar();
                this.montarListaKitnets({situacao:'DESOCUPADO'}); 
                this.props.history.push('/manter-alugueis')
            })
            .catch(error => {
                mensagemErro(error.response.data)
            })

    }


    buscar = () =>{     
        const aluguelFitro = {
            inquilino: this.state.idInquilino,
            kitnet: this.state.idKitnet
            
        }
    
        this.service
                    .consultar(aluguelFitro)
                    .then(resposta =>{
                        const lista = resposta.data;
                        this.setState({alugueis: lista})
                    }).catch(error =>{
                        console.log(error);
                    })
    
        }
 
 

     abrirConfirmacao = (aluguel) =>{
        this.setState({showConfirmDialog:true,aluguelDeletar:aluguel});
    }

    cancelarDelecao = ()=>{
        this.setState({showConfirmDialog:false, aluguelDeletar:{}})
    }
    
    deletar = () =>{
        this.service
             .deletar(this.state.aluguelDeletar.id)
             .then(response => {
                 const alugueis = this.state.alugueis;
                 const index = alugueis.indexOf(this.state.aluguelDeletar);
                 alugueis.splice(index,1);
                 this.setState({alugueis:alugueis,showConfirmDialog:false});
                 messages.mensagemSucesso('Aluguel deletado com Sucesso.!');
                 this.montarListaKitnets({situacao:'DESOCUPADO'}); 
             }).catch(error =>{
                 messages.mensagemErro("Erro ao Excluir o aluguel");
             })
     }
      


     editar = (aluguel) => {
        this.setState({id:aluguel.id,dataIni:aluguel.dataIni,dataFim:aluguel.dataFim, valor:aluguel.valor, idInquilino:aluguel.inquilino.id, idKitnet:aluguel.kitnet.id,atualizando:true});
     }

     alterar = () => {
        const {id,idInquilino, idKitnet, dataIni,dataFim,valor} = this.state;
        const inquilino = {id:idInquilino}
        const kitnet = {id:idKitnet}
        const aluguel = {id,dataIni,dataFim,valor,inquilino,kitnet}
        
        try {
            this.service.validar(aluguel);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.atualizar(aluguel)
            .then(response => {
                mensagemSucesso('Aluguel Atualizado com Sucesso.')
                this.limparCampos();
                this.buscar();
                this.montarListaKitnets({situacao:'DESOCUPADO'}); 
                this.props.history.push('/manter-alugueis')
            })
            .catch(error => {
                mensagemErro(error.response.data)
            })

    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }
    
    render(){
        const confirmDialogfooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );
      
        return(
            <Card title={this.state.atualizando ? "Atualização de Alugueis" : "Cadastro de Alugueis"}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-Component">
                            <fieldset>
                            <div className="row">
                                <div className="col-lg-3">
                                    <FormGroup label="KitNet:*" htmlFor="inputKitNet">
                                    <SelectMenu
                                        id="inputKitNet"
                                        value={this.state.idKitnet}
                                        onChange={this.handleChange}
                                        name="idKitnet"
                                        lista={this.state.listaKitnets}
                                        className="form-control" />
                                    </FormGroup>
                                </div>
                                <div className="col-lg-8">
                                    <FormGroup label="Inquilino:*" htmlFor="inputInquilino">
                                    <SelectMenu
                                        id="inputInquilino"
                                        value={this.state.idInquilino}
                                        onChange={this.handleChange}
                                        name="idInquilino"
                                        lista={this.state.listaInquilinos}
                                        className="form-control" />
                                    </FormGroup>
                                </div>
                                
                            </div>        
                             <br/>
                             <div className="row">
                                <div className="col-lg-2">
                                    <FormGroup label="Data Início:" htmlFor="inputDataini">
                                        <ReactInputMask 
                                            mask={'99/99/9999'}
                                            value={this.state.dataIni}
                                            className="form-control"
                                            id="inputDataini"        
                                            placeholder="Informe a data de Início"
                                            onChange={e => this.setState({ dataIni: e.target.value })}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-lg-2">
                                    <FormGroup label="Data Fim:" htmlFor="inputDatafim">
                                        <ReactInputMask 
                                            mask={'99/99/9999'}
                                            value={this.state.dataFim}
                                            className="form-control"
                                            id="inputDatafim"        
                                            placeholder="Informe a data Fim"
                                            onChange={e => this.setState({ dataFim: e.target.value })}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-lg-2">
                                    <FormGroup label="Valor Aluguel:" htmlFor="inputValorAluguel">
                                        <ReactInputMask 
                                            mask={'999'}
                                            value={this.state.valor}
                                            className="form-control"
                                            id="inputValorAluguel"        
                                            placeholder="Informe o valor."
                                            onChange={e => this.setState({ valor: e.target.value })}
                                        />
                                    </FormGroup>
                                </div>
                                
                            </div>
                            <br/>    
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
                            <AlugueisTable
                                alugueis={this.state.alugueis}
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
                        Confirma a exclusão do aluguel?
                    </Dialog>
                </div>
            </Card>
        )
    }


}
export default withRouter(ManterAlugueis);