import React from "react";

export default props =>{

    const rows = props.kitnets.map(kitnet => {
        return(
            <tr key={kitnet.id}>
                <td>{kitnet.nome}</td>
                <td>{kitnet.descricao}</td>
                <td>{kitnet.situacao}</td>
                <td>
                    <button type="button" title="Editar"
                            className=" btn btn-primary"
                            onClick={e => props.editAction(kitnet)}>   
                             <i className="pi pi-pencil"/>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(kitnet)} >
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
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
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