import React from "react";

export default props =>{

    const rows = props.alugueis.map(aluguel => {
        return(
            <tr key={aluguel.id}>
                <td>{aluguel.kitnet.nome}</td>
                <td>{aluguel.inquilino.nome}</td>
                <td>{aluguel.dataIni}</td>
                <td>{aluguel.dataFim}</td>
                <td>{aluguel.valor}</td>
                <td>
                    <button type="button" title="Editar"
                            className=" btn btn-primary"
                            onClick={e => props.editAction(aluguel)}>   
                             <i className="pi pi-pencil"/>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(aluguel)} >
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
                    <th scope="col">Kitnet</th>
                    <th scope="col">Inquilino</th>
                    <th scope="col">Data Início</th>
                    <th scope="col">Data Fim</th>
                    <th scope="col">Valor</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}