import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes, Link} from "react-router-dom";

import Main from "./Main";
import Eur from "./Eur";
import Leg from "./Leg";
import Reg from "./Reg";
import Mun from "./Mun";

import "../css/morph.min.css";
import "../css/fontawesome.all.min.css";
import "../css/myStyle.css";


export default function App(){

    function navBar() {

        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">SimPol</Link>
                    <div class="navbar" id="navbarColor01">
                        <Link class="nav-link mx-2" to="/eur">Européennes</Link>
                        <Link class="nav-link mx-2" href="#">Législatives</Link>
                        <Link class="nav-link mx-2" href="#">Régionales</Link>
                        <Link class="nav-link mx-2" href="#">Municipales</Link>
                    </div>
                </div>
            </nav>
        );
    }

    return(
        <div>
            {navBar()}

            <Routes>
                <Route exact path="/" element = {
                    <Main
                />}></Route>
                <Route exact path="/eur" element={
                    <Eur
                />}></Route>
                <Route exact path="/leg" element={
                    <Leg
                />}></Route>
                <Route exact path="/reg" element={
                    <Reg
                />}></Route>
                <Route exact path="/mun" element={
                    <Mun
                />}></Route>
            </Routes>
        </div>
    );

}