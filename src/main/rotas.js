import React from "react";
import {Route,Switch,HashRouter,Redirect} from "react-router-dom";
import CadastroUsuario from "../views/cadastroUsuarios";
import Home from "../views/home";
import Login from "../views/login";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamento";
import CadastroLancamentos from "../views/cadastro-lancamentos";
import LandingPage from '../views/landingPage'

import { AuthConsumer } from "./provedorAutenticacao";
import manterUsuarios from "../views/usuarios/manterUsuarios";


function RotaAutenticada({component:Component, isUsuarioAutenticado, ...props}){
    return(
        <Route exact {...props} render = {(componentProps) =>{
            if(isUsuarioAutenticado){
                return(
                    <Component {... componentProps}/>
                )
            }else{
                return <Redirect to ={ {pathname:'/login', state:{from : componentProps.location} } }/>
            }
        }} />
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route exact path={"/"}component={LandingPage}></Route>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/cadastro-usuarios/:cpf?"} component={CadastroUsuario}/>
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path={"/home"} component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path={"/manter-usuarios"} component={manterUsuarios}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path={"/cadastro-lancamentos/:id?"} component={CadastroLancamentos}/>
            </Switch>
        </HashRouter>
    )
}
 
export default () =>(
    <AuthConsumer>
      { (context) => (
          <Rotas isUsuarioAutenticado={context.isAutenticado}/>
      )}
    </AuthConsumer>
)
