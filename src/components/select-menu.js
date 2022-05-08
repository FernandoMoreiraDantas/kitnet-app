import React from "react";

function SelectMenu(props){
    const options = props.lista.map( (option,index) =>{
        return (
            <option key={index} value={option.id}>{option.nome}</option>
        )
        
    })

    return(
        <select {...props}>
            <option value={''}>{'--- Selecione ---'}</option>
            {options}
        </select>
    )
}

export default SelectMenu