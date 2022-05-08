import React from "react";

export default props =>{

    const rows = props.inquilinos.map(inquilino => {
        return(
            <tr key={inquilino.id}>
                <td>{inquilino.cpf}</td>
                <td>{inquilino.nome}</td>
                <td>{inquilino.celular}</td>
                <td>
                    <button type="button" title="Editar"
                            className=" btn btn-primary"
                            onClick={e => props.editAction(inquilino)}>   
                             <i className="pi pi-pencil"/>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(inquilino)} >
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
                    <th scope="col">CPF</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Celular</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}