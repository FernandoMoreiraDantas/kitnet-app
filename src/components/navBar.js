import React from "react";
import NavBarItem from "./navBarItem";
import { AuthConsumer } from "../main/provedorAutenticacao";


function NavBar(props) {
    console.log(props);
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="">
                <a href="#/Home" className="navbar-brand">&nbsp;Loiolas&Dantas</a>
                <button className="navbar-toggler"
                    type="button" data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/manter-usuarios" label="Usuários" />
                        <NavBarItem render={props.isUsuarioAutenticado}  label="Imóveis" />
                        <NavBarItem render={props.isUsuarioAutenticado}  label="Contratos" />
                        <NavBarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#login" label="Sair" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <NavBar isUsuarioAutenticado={context.isAutenticado} deslogar = {context.encerrarSessao}/>
        )}
    </AuthConsumer>
)