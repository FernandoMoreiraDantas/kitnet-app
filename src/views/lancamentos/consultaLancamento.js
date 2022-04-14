import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-groups";
import SelectMenu from "../../components/select-menu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStoregeService from "../../app/service/localstoregeService";
import * as messages from "../../components/toastr"
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button'

class ConsultaLancamentos extends React.Component{

    state = {
        ano:'',
        mes:'',
        tipo:undefined,
        descricao:'',
        showConfirmDialog:false,
        lancamentoDeletar:{},
        lancamentos : []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        this.buscar();
    }

    prepareCadastrar = () =>{
        this.props.history.push('/cadastro-lancamentos/');
    }

    alterarStatus = (lancamento, status) => {
        this.service.aletrarStatus(lancamento.id, status)
                    .then(response =>{
                        const lancamentos = this.state.lancamentos;
                        const index = lancamentos.indexOf(lancamento);
                        if(index !== -1){
                            lancamento['status'] = status
                            lancamento[index] = lancamento
                            this.setState({lancamento});
                        }
                        messages.mensagemSucesso("Status atualizado com sucesso.");
                    })
    }

    buscar = () =>{  
       const usuarioLogado = LocalStoregeService.obterItem('_usuario_logado');

       const lancamentoFitro = {
           ano: this.state.ano,
           mes: this.state.mes,
           tipo: this.state.tipo,
           usuario: usuarioLogado.id,
           descricao:this.state.descricao
       }

       this.service
                   .consultar(lancamentoFitro)
                   .then(resposta =>{
                       const lista = resposta.data;
                       if(lista.length < 1){
                           messages.mensagemAlerta("Nenhum Resultado Encontrado");
                       }
                       this.setState({lancamentos: lista})
                   }).catch(error =>{
                       console.log(error);
                   })

    }

    editar = (id) => {
       this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) =>{
        this.setState({showConfirmDialog:true,lancamentoDeletar:lancamento});
    }

    cancelarDelecao = ()=>{
        this.setState({showConfirmDialog:false, lancamentoDeletar:{}})
    }


    deletar = () =>{
       this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                console.log(lancamentos);
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                console.log(index);
                lancamentos.splice(index,1);
                this.setState({lancamentos:lancamentos,showConfirmDialog:false});
                messages.mensagemSucesso('Lançamento deletado com Sucesso.!');
            }).catch(error =>{
                messages.mensagemErro("Erro ao Excluir o Lançamento");
            })
    }

    render(){

        const listaMeses = this.service.obterListaMeses();
        const listaTipo = this.service.obterListaTipos();

        const confirmDialogfooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

       
        return(
            <Card title="Consulta de Lançamentos">
            <div className="row">
                <div className="col-lg-4">
                    <div className="bs-Component"> 
                        <fieldset>
                            <FormGroup label="Ano:*" htmlFor="inputAno">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange = {e => this.setState({ ano: e.target.value })}
                                    placeholder="Informe o Ano"
                                    name="ano" />
                            </FormGroup>
                            <br/>
                            <FormGroup label="Mês:" htmlFor="inputMes">
                                <SelectMenu id="inputMes" 
                                className="form-control" 
                                value={this.state.mes}
                                onChange = {e => this.setState({ mes: e.target.value })}
                                lista = {listaMeses}/>
                            </FormGroup>
                            <br/>
                            <FormGroup label="Descrição:" htmlFor="inputDesc">
                                <input type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    value={this.state.descricao}
                                    onChange = {e => this.setState({ descricao: e.target.value })}
                                    placeholder="Informe a descrição"
                                    name="desc" />
                            </FormGroup>
                            <br/>
                            <FormGroup label="Tipo Lançamento:" htmlFor="inputTipo">
                                <SelectMenu id="inputTipo" 
                                className="form-control" 
                                value = {this.state.tipo}
                                onChange = {e => this.setState({ tipo: e.target.value})}
                                lista = {listaTipo}/>
                            </FormGroup>
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
                            
                           
                        </fieldset>
                    </div>
                </div>
            </div>
            <br/> 
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable 
                            lancamentos={this.state.lancamentos}
                            deleteAction={this.abrirConfirmacao}
                            editAction={this.editar}
                            alterarStatus={this.alterarStatus}/>
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
                        Confirma a exclusão deste Lançamento?
                    </Dialog>
            </div>
        </Card>


            
        )
    }


}
export default withRouter(ConsultaLancamentos);