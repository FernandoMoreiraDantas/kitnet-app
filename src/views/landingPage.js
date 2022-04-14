import React from 'react'
import {withRouter} from 'react-router-dom'

class LandingPage extends React.Component{

    gotToHomePage = () =>{
        this.props.history.push('/home')
    }


    render(){
        return(
            <div className='container text-center'>
                <h2>Bem vindo ao Controle de "Kitnet"</h2>
                Este é seu sistema para controle de Kitnets, clique no botão abaixo, para acessar o sistema:<br/><br/>
                <div className='offset-md-4 col-md-4'>
                    <button style={{width:'100%'}} onClick={this.gotToHomePage}>
                        <i className='pi pi-sign-in'></i> Acessar
                    </button>

                </div>
            </div>
        )
    }
}

export default withRouter(LandingPage)
