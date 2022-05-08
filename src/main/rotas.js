import React from "react";
import {Route,Switch,HashRouter,Redirect} from "react-router-dom";
import manterAlugueis from "../views/alugueis/manterAlugueis";
import Home from "../views/home";
import manterInquilinos from "../views/inquilinos/manterInquilinos";
import manterKitnets from "../views/kitnets/manterKitnets";
import Login from "../views/login"
import { AuthConsumer } from "./provedorAutenticacao";



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
                <Route exact path={"/"}component={Login}></Route>
                <Route exact path={"/login"} component={Login}/>
                            
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path={"/home"} component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path={"/manter-inquilinos"} component={manterInquilinos}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path={"/manter-kitnets"} component={manterKitnets}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path={"/manter-alugueis"} component={manterAlugueis}/>
         
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
