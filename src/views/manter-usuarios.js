import React from "react";


class ManterUsuario extends React.Component{
 

   
    render(){
        return(
               <div className="row">
                   <div className="col-md-6 offset-md-3">
                        <div className="bs-docs-section">
                            <Card title="Login">
                               <div className="row">
                                    <div className="col-lg-12"> 
                                            <div className="bs-Component">
                                                <fieldset>
                                                    <FormGroup label="CPF:*" htmlFor="cpf">
                                                    <ReactInputMask
                                                        mask={'999.999.999-99'}
                                                        value={this.state.cpf}
                                                               onChange={e => this.setState({cpf:e.target.value})} 
                                                               className="form-control"
                                                               id="cpf"
                                                               aria-describedby="emailHelp"
                                                               placeholder="Digite o CPF"/>

                                                    </FormGroup>
                                                    
                                                    
                                                </fieldset>
                                            </div>
                                    </div>
                                </div>
                            </Card>
                            
                        </div>
                   </div>
               </div>
        )
    }
}

Login.contextType = AuthContext;

export default withRouter(Login)