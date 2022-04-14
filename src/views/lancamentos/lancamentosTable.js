import React from "react";
import currencyFormatter from "currency-formatter";

export default props =>{

    const rows = props.lancamentos.map(Lancamento => {
        return(
            <tr key={Lancamento.id}>
                <td>{Lancamento.descricao}</td>
                <td>{currencyFormatter.format(Lancamento.valor,{locale:'pt-BR'})}</td>
                <td>{Lancamento.tipo}</td>
                <td>{Lancamento.mes}</td>
                <td>{Lancamento.status}</td>
                <td>
                    <button className="btn btn-success" title="Efetivar"
                            onClick={e => props.alterarStatus(Lancamento,'EFETIVADO')}
                            disabled={Lancamento.status === 'EFETIVADO'} 
                            type="button">
                               <i className="pi pi-check"/>
                    </button>
                    <button className="btn btn-danger" title="Cancelar"
                            disabled={Lancamento.status === 'CANCELADO'}
                            onClick={e => props.alterarStatus(Lancamento,'CANCELADO')}
                            type="button">
                                <i className="pi pi-times"/>
                    </button>
                    <button type="button" title="Editar"
                            className=" btn btn-primary"
                            onClick={e => props.editAction(Lancamento.id)}>   
                             <i className="pi pi-pencil"/>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(Lancamento)} >
                                 <i className="pi pi-trash"/>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}